using api.Entities;

namespace api.Interfaces
{
    public interface IEquipmentRepository
    {
        void AddEquipment(Room room);
        void RemoveEquipment(Room room);
        Task<IEnumerable<Room>> GetEquipmentAsync();
    }
}
