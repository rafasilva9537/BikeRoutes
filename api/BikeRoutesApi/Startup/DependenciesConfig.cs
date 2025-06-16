using System.Text.Json.Serialization;
using BikeRoutesApi.Data;

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
}