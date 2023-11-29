using api.Entities;

namespace api.Interfaces
{
    public interface IEquipmentRepository
    {
        void AddEquipment(EquipmentItem equipmentItem);
        void RemoveEquipment(EquipmentItem equipmentItem);
        Task<IEnumerable<EquipmentItem>> GetEquipmentAsync();
        Task<EquipmentItem> GetEquipmentItemByIdAsync(int id);
    }
}
