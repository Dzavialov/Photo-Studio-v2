namespace api.Entities
{
    public class Room
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string AdditionalInformation { get; set; }
        public List<RoomImage> Images { get; set; }
        public List<Booking> Bookings { get; set; }
    }
}
