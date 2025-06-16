using Scalar.AspNetCore;

namespace BikeRoutesApi.Startup;

public static class OpenApiConfig
{
    public static void UseOpenApi(this WebApplication app)
    {
        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
            app.MapScalarApiReference((options) =>
            {
                options.Title = "Bike Routes API";
                options.Theme = ScalarTheme.BluePlanet;
                options.DarkMode = true;
                options.DefaultHttpClient = new KeyValuePair<ScalarTarget, ScalarClient>(ScalarTarget.JavaScript, ScalarClient.Axios);
            });
        }
    }
}