﻿using Microsoft.AspNetCore.Identity;

namespace api.Entities
{
    public class User : IdentityUser<int>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public List<Booking> Bookings { get; set; }
    }
}