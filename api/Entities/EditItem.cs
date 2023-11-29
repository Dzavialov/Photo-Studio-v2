namespace api.Entities
{
    public class EditItem
    {
        public int Id { get; set; }
        public string UserMessage { get; set; }
        public List<EditItemImage> Images { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
