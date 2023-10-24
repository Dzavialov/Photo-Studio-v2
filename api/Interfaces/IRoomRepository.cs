using api.DTOs;
using api.Entities;

namespace api.Interfaces
{
    public interface IRoomRepository
    {
        void AddRoom(Room room);
        void RemoveRoom(Room room);
        Task<IEnumerable<Room>> GetRoomsAsync();
        Task<Room> GetRoomByIdAsync(int id);
        Task<bool> SaveAllAsync();
    }
}
