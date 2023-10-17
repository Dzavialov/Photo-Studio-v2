using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities
{
    [Table("Images")]
    public class RoomImage
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public int RoomId { get; set; }
        public Room Room { get; set; }
    }
}
