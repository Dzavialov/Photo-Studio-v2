using api.Entities;

namespace api.DTOs
{
    public class EquipmentItemDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public EquipmentItemImageDto Image { get; set; }
        public int RoomId { get; set; }
    }
}
