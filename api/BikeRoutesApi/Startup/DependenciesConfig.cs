using System.Text.Json.Serialization;
using BikeRoutesApi.Data;
using Microsoft.EntityFrameworkCore;

namespace BikeRoutesApi.Startup;

public static class DependenciesConfig
{
    public static void AddCustomControllers(this IServiceCollection services)
    {
        services.AddControllers()
            .AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
            });
    }

    public static void AddCustomDbContext(this WebApplicationBuilder builder)
    {
        var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? Environment.GetEnvironmentVariable("POSTGRES_CONNECTION_STRING");
        builder.Services.AddDbContext<BikeRoutesDbContext>(options => 
            options.UseNpgsql(
                connectionString, 
                optionsBuilder => optionsBuilder.UseNetTopologySuite()
            )
        );
    }
}