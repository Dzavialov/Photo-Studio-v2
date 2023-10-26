using api.Data;
using api.DTOs;
using api.Entities;
using api.Extensions;
using api.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Diagnostics.Eventing.Reader;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly IBookingRepository _bookingRepository;
        private readonly IMapper _mapper;

        public BookingsController(IBookingRepository bookingRepository, IMapper mapper)
        {
            _bookingRepository = bookingRepository;
            _mapper = mapper;
        }

        [Authorize(Roles = "User, Admin")]
        [HttpGet("{id}")]
        public async Task<ActionResult<BookingDto>> GetBooking(int id)
        {
            var booking = await _bookingRepository.GetBookingByIdAsync(id);
            return Ok(_mapper.Map<BookingDto>(booking));
        }

        [Authorize(Roles = "User, Admin")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings()
        {
            var bookings = await _bookingRepository.GetBookingsAsync();
            return Ok(_mapper.Map<IEnumerable<BookingDto>>(bookings));
        }

        [Authorize(Roles = "User")]
        [HttpGet("user-bookings")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetUserBookings()
        {
            var userId = User.GetUserId();
            var bookings = await _bookingRepository.GetBookingsByUserIdAsync(userId);
            return Ok(_mapper.Map<IEnumerable<BookingDto>>(bookings));
        }

        [Authorize(Roles = "User")]
        [HttpPost("book-room/{roomId}")]
        public async Task<ActionResult<BookingDto>> CreateBooking(BookingDto bookingDto, [FromRoute] int roomId)
        {
            if (bookingDto is null) return BadRequest("Object is empty");
            if (!FromToValidation(bookingDto.BookFrom, bookingDto.BookTo)) return BadRequest("Invalid datetime input.");
            
            bool bookingOverlap = (await _bookingRepository.GetBookingsAsync())
                .Where(r => r.RoomId == roomId)
                .Any(x => HasOverlap(x.BookFrom, x.BookTo, bookingDto.BookFrom, bookingDto.BookTo));

            if (bookingOverlap) return BadRequest("There is overlap between booking times.");

            var userId = User.GetUserId();

            bookingDto.UserId = userId;
            bookingDto.RoomId = roomId;
            bookingDto.Status = "In Process";

            var booking = _mapper.Map<Booking>(bookingDto);
            _bookingRepository.AddBooking(booking);

            if (await _bookingRepository.SaveAllAsync()) return CreatedAtAction(nameof(GetBooking), new { id = booking.Id }, _mapper.Map<BookingDto>(booking));

            return BadRequest("Failed to book a room.");
        }

        [Authorize(Roles = "User, Admin")]
        [HttpDelete("{bookingId}")]
        public async Task<ActionResult> DeleteBooking(int bookingId)
        {
            var booking = await _bookingRepository.GetBookingByIdAsync(bookingId);

            if (booking is null) return NotFound();

            _bookingRepository.RemoveBooking(booking);

            if (await _bookingRepository.SaveAllAsync()) return Ok();

            return BadRequest("Failed to delete a booking.");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{bookingId}")]
        public async Task<ActionResult> FinishBooking(BookingUpdateDto bookingUpdateDto, int bookingId)
        {
            var booking = await _bookingRepository.GetBookingByIdAsync(bookingId);

            if (booking is null) return NotFound();

            bookingUpdateDto.Status = "Finished";

            _mapper.Map(bookingUpdateDto, booking);

            if (await _bookingRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to finish booking.");
        }
        private static bool FromToValidation(DateTime from, DateTime to)
        {
            if (from < DateTime.UtcNow || to <= from) return false;
            return true;
        }

        public static bool HasOverlap(DateTime start1, DateTime end1, DateTime start2, DateTime end2)
        {
            return start1 < end2 && end1 > start2;
        }
    }
}
