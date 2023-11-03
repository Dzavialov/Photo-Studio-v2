using api.DTOs;
using api.Entities;
using api.Extensions;
using api.Helpers;
using api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SendGrid;
using SendGrid.Helpers.Mail;
using SendGrid.Helpers.Mail.Model;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public BookingsController(IUnitOfWork uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }

        [Authorize(Roles = "User, Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<BookingDto>> GetBooking(int id)
        {
            var booking = await _uow.BookingRepository.GetBookingByIdAsync(id);
            return Ok(_mapper.Map<BookingDto>(booking));
        }

        [Authorize(Roles = "User, Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookingDto>>> GetBookings()
        {
            var bookings = (await _uow.BookingRepository.GetBookingsAsync())
                .Where(s => s.Status == "In Process")
                .OrderBy(b => b.BookFrom);
            return Ok(_mapper.Map<IEnumerable<BookingDto>>(bookings));
        }

        [Authorize(Roles = "User")]
        [HttpGet("date-bookings")]
        public async Task<ActionResult<IEnumerable<BookingDto>>> GetDateBookings([FromQuery] DateBookingQuery query)
        {
            var bookings = (await _uow.BookingRepository.GetBookingsAsync()).Where(r => r.RoomId == query.roomId).Where(x => x.BookFrom.Date == query.bookingDate.Date);
            return Ok(_mapper.Map<IEnumerable<BookingDto>>(bookings));
        }

        [Authorize(Roles = "User")]
        [HttpGet("user-bookings")]
        public async Task<ActionResult<IEnumerable<BookingDto>>> GetUserBookings()
        {
            var userId = User.GetUserId();
            var bookings = await _uow.BookingRepository.GetBookingsByUserIdAsync(userId);
            return Ok(_mapper.Map<IEnumerable<BookingDto>>(bookings));
        }

        [Authorize(Roles = "User")]
        [HttpPost("book-room/{roomId}")]
        public async Task<ActionResult<BookingDto>> CreateBooking(BookingDto bookingDto, [FromRoute] int roomId)
        {
            if (bookingDto is null) return BadRequest("Object is empty");
            if (!FromToValidation(bookingDto.BookFrom, bookingDto.BookTo)) return BadRequest("Invalid datetime input.");
            
            bool bookingOverlap = (await _uow.BookingRepository.GetBookingsAsync())
                .Where(r => r.RoomId == roomId)
                .Any(x => HasOverlap(x.BookFrom, x.BookTo, bookingDto.BookFrom, bookingDto.BookTo));

            if (bookingOverlap) return BadRequest("There is overlap between booking times.");

            bookingDto.UserId = User.GetUserId();
            bookingDto.RoomId = roomId;
            bookingDto.Username = User.GetUsername();
            bookingDto.Status = "In Process";

            var booking = _mapper.Map<Booking>(bookingDto);
            _uow.BookingRepository.AddBooking(booking);

            if (await _uow.Complete()) return CreatedAtAction(nameof(GetBooking), new { id = booking.Id }, _mapper.Map<BookingDto>(booking));

            return BadRequest("Failed to book a room.");
        }

        [Authorize(Roles = "User, Admin")]
        [HttpDelete("{bookingId}")]
        public async Task<ActionResult> DeleteBooking(int bookingId)
        {
            var booking = await _uow.BookingRepository.GetBookingByIdAsync(bookingId);

            if (booking is null) return NotFound();

            _uow.BookingRepository.RemoveBooking(booking);

            if (await _uow.Complete()) return Ok();

            return BadRequest("Failed to delete a booking.");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{bookingId}")]
        public async Task<ActionResult> FinishBooking(BookingUpdateDto bookingUpdateDto, int bookingId)
        {
            var booking = await _uow.BookingRepository.GetBookingByIdAsync(bookingId);

            if (booking is null) return NotFound();

            bookingUpdateDto.Status = "Finished";

            _mapper.Map(bookingUpdateDto, booking);

            if (await _uow.Complete()) 
            {
                await SendEmailAsync(booking);
                return NoContent();
            }
            return BadRequest("Failed to finish booking.");
        }

        public async Task SendEmailAsync(Booking booking)
        {
            var user = await _uow.UserRepository.GetUserByIdAsync(booking.UserId);
            var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
            var client = new SendGridClient(apiKey);
            var msg = new SendGridMessage()
            {
                From = new EmailAddress("forsteam0014@gmail.com", "Фотостудія Веселка"),
                Subject = "Результати фотозйомки",
                PlainTextContent = $"Результати вашої фотосесії вже готові і знаходяться на сайті в розділі Мої Бронювання або за посиланням {booking.FileUrl}",
            };
            msg.AddTo(new EmailAddress(user.Email, user.UserName));
            await client.SendEmailAsync(msg);
        }
        private static bool FromToValidation(DateTime from, DateTime to)
        {
            if (from < DateTime.UtcNow || to <= from) return false;

            TimeSpan startTime = TimeSpan.FromHours(7);
            TimeSpan endTime = TimeSpan.FromHours(19);
            TimeSpan minTimeDifference = TimeSpan.FromHours(1);

            if (from.TimeOfDay < startTime)
            {
                return false;
            }

            if (to.TimeOfDay > endTime)
            {
                return false;
            }

            if ((to - from) < minTimeDifference)
            {
                return false;
            }

            return true;
        }

        public static bool HasOverlap(DateTime start1, DateTime end1, DateTime start2, DateTime end2)
        {
            return start1 < end2 && end1 > start2;
        }
    }
}
