using api.Entities;

namespace api.DTOs
{
    public class EditItemDto
    {
        public int Id { get; set; }
        public string UserMessage { get; set; }
        public string InputUrl { get; set; }
        public string FileUrl { get; set; }
        public string Status { get; set; }
        public string Username { get; set; }
        public int UserId { get; set; }
    }
}
