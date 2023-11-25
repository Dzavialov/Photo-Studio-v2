namespace api.Entities
{
    public class EquipmentItemImage
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public int EquipmentId { get; set; }
        public EquipmentItem Equipment { get; set; }
    }
}
