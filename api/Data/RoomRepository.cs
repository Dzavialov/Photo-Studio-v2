using api.DTOs;
using api.Entities;
using api.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class RoomRepository : IRoomRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public RoomRepository(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public void AddRoom(Room room)
        {
            _context.Add(room);
        }

        public async Task<Room> GetRoomByIdAsync(int id)
        {
            return await _context.Rooms.Include(i => i.Images).SingleOrDefaultAsync(r => r.Id == id);
        }

        public async Task<IEnumerable<Room>> GetRoomsAsync()
        {
            return await _context.Rooms.Include(i => i.Images).ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            var result = await _context.SaveChangesAsync() > 0;
            return result;
        }
    }
}
