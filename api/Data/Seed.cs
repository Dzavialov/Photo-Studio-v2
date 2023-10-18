using api.Entities;
using Microsoft.AspNetCore.Identity;
using System.Data;
using System.Text.Json;

namespace api.Data
{
    public class Seed
    {
        public static async Task SeedRoles(UserManager<User> userManager, RoleManager<IdentityRole<int>> roleManager)
        {
            var roles = new List<IdentityRole<int>>
            {
                new IdentityRole<int>{Name = "User"},
                new IdentityRole<int>{Name = "Admin"},
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            var admin = new User
            {
                UserName = "admin"
            };

            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, new[] { "Admin" });
        }
    }
}
