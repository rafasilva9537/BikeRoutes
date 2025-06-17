using BikeRoutesApi.Data;
using Microsoft.EntityFrameworkCore;

namespace BikeRoutesApi.Startup;

public static class DatabaseStartup
{
    public static void UseDatabase(this WebApplication app)
    {
        using var scope = app.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<BikeRoutesDbContext>();

        dbContext.Database.Migrate();
        
        if (!dbContext.Users.Any())
        {
            
        }
    }
    
    public static void SeedDatabase(BikeRoutesDbContext dbContext)
    {
        
    }
}