using api.Entities;

namespace api.Interfaces
{
    public interface IUserRepository
    {
        Task<User> GetUserByIdAsync(int id);
    }
}
