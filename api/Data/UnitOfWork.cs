using api.Interfaces;
using AutoMapper;

namespace api.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DataContext _context;

        public UnitOfWork(DataContext context)
        {
            _context = context;
        }

        public IRoomRepository RoomRepository => new RoomRepository(_context);

        public IBookingRepository BookingRepository => new BookingRepository(_context);

        public IUserRepository UserRepository => new UserRepository(_context);
        public IEquipmentRepository EquipmentRepository => new EquipmentRepository(_context);
        public IEditRepository EditRepository => new EditRepository(_context);

        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}
