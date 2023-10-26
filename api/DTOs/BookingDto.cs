namespace api.DTOs
{
    public class BookingDto
    {
        public int Id { get; set; }
        public DateTime BookFrom { get; set; }
        public DateTime BookTo { get; set; }
        public string Status { get; set; }
        public string FileUrl { get; set; }
        public int UserId { get; set; }
        public int RoomId { get; set; }
    }
}
