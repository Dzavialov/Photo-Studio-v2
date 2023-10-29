using Microsoft.AspNetCore.Identity;

namespace api.Entities
{
    public class User : IdentityUser<int>
    {
        public List<Booking> Bookings { get; set; }
    }
}
