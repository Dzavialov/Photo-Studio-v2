using api.DTOs;
using api.Entities;

namespace api.Interfaces
{
    public interface IRoomRepository
    {
        void AddRoom(Room room);
        Task<IEnumerable<Room>> GetRoomsAsync();
        Task<Room> GetRoomByIdAsync(int id);
        Task<bool> SaveAllAsync();
    }
}
