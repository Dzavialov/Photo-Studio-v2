using api.Data;
using api.Entities;
using api.Interfaces;
using api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace api
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            
            builder.Services.AddDbContext<DataContext>(options =>
            {
                options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
            });
            
            builder.Services.AddIdentityCore<User>(options =>
            {
                options.Password.RequireNonAlphanumeric = false;
            })
                .AddRoles<IdentityRole<int>>()
                .AddEntityFrameworkStores<DataContext>();
            
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding
                        .UTF8.GetBytes(builder.Configuration["TokenKey"])),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });

            builder.Services.AddAuthorization();

            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            builder.Services.AddScoped<ITokenService, TokenService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            //using var scope = app.Services.CreateScope();
            //var services = scope.ServiceProvider;
            //try
            //{
            //    var context = services.GetRequiredService<DataContext>();
            //    var userManager = services.GetRequiredService<UserManager<User>>();
            //    var roleManager = services.GetRequiredService<RoleManager<IdentityRole<int>>>();
            //    await context.Database.MigrateAsync();
            //    await Seed.SeedRoles(userManager, roleManager);
            //}
            //catch (Exception ex)
            //{
            //    var logger = services.GetService<ILogger<Program>>();
            //    logger.LogError(ex, "An error occured during migration.");
            //}

            app.Run();
        }
    }
}