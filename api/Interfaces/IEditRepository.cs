using api.Entities;

namespace api.Interfaces
{
    public interface IEditRepository
    {
        void AddEditItem(EditItem editItem);
        void RemoveEditItem(EditItem editItem);
        Task<IEnumerable<EditItem>> GetEditItemsAsync();
        Task<EditItem> GetEditItemByIdAsync(int id);
        Task<IEnumerable<EditItem>> GetEditItemsByUserIdAsync(int id);
    }
}
