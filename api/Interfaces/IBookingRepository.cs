using api.DTOs;
using api.Entities;

namespace api.Interfaces
{
    public interface IBookingRepository
    {
        void AddBooking(Booking booking);
        void RemoveBooking(Booking booking);
        Task<IEnumerable<Booking>> GetBookingsAsync();
        Task<Booking> GetBookingByIdAsync(int id);
        Task<IEnumerable<Booking>> GetBookingsByUserIdAsync(int id);
    }
}
