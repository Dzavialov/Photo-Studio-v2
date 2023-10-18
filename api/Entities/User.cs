using Microsoft.AspNetCore.Identity;

namespace api.Entities
{
    public class User : IdentityUser<int>
    {
        public string FullName { get; set; }
        public List<Booking> Bookings { get; set; }
    }
}
