namespace api.Entities
{
    public class EditItemImage
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public string PublicId { get; set; }
        public int EditItemId { get; set; }
        public EditItem EditItem { get; set; }
    }
}
