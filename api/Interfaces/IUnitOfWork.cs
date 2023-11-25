namespace api.Interfaces
{
    public interface IUnitOfWork
    {
        IRoomRepository RoomRepository { get; }
        IBookingRepository BookingRepository { get; }
        IUserRepository UserRepository { get; }
        IEquipmentRepository EquipmentRepository { get; }
        Task<bool> Complete();
    }
}
