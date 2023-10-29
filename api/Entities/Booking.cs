namespace api.Entities
{
    public class Booking
    {
        public int Id { get; set; }
        public DateTime BookFrom { get; set; }
        public DateTime BookTo { get; set; }
        public string Status { get; set; }
        public string FileUrl { get; set; }
        public string Username { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int RoomId { get; set; }
        public Room Rooms { get; set; }
    }
}
