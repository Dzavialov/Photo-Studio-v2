using api.Entities;

namespace api.DTOs
{
    public class BookingDto
    {
        public int Id { get; set; }
        public DateTime BookFrom { get; set; }
        public DateTime BookTo { get; set; }
        public int UserId { get; set; }
        public int RoomId { get; set; }
    }
}
