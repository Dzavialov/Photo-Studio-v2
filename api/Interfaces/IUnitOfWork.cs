namespace api.Interfaces
{
    public interface IUnitOfWork
    {
        IRoomRepository RoomRepository { get; }
        IBookingRepository BookingRepository { get; }
        IUserRepository UserRepository { get; }
        IEquipmentRepository EquipmentRepository { get; }
        IEditRepository EditRepository { get; }
        Task<bool> Complete();
    }
}
