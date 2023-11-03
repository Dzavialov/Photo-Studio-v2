namespace api.Interfaces
{
    public interface IUnitOfWork
    {
        IRoomRepository RoomRepository { get; }
        IBookingRepository BookingRepository { get; }
        IUserRepository UserRepository { get; }
        Task<bool> Complete();
    }
}
