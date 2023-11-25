using api.Entities;

namespace api.Interfaces
{
    public interface IEquipmentRepository
    {
        void AddEquipment(EquipmentItem equipment);
        void RemoveEquipment(EquipmentItem equipment);
        Task<IEnumerable<EquipmentItem>> GetEquipmentAsync();
        Task<EquipmentItem> GetEquipmentItemByIdAsync(int id);
    }
}
