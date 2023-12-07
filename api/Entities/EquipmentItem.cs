namespace api.Entities
{
    public class EquipmentItem
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public EquipmentItemImage Image { get; set; }
        public int RoomId { get; set; }
        public Room Room { get; set; }
    }
}
