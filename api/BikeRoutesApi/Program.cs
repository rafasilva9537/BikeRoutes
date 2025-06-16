using System.Text.Json.Serialization;
using BikeRoutesApi.Data;
using BikeRoutesApi.Startup;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddDbContext<BikeRoutesDbContext>();

builder.Services.AddCustomControllers();
builder.Services.AddRouting(options => options.LowercaseUrls = true);

var app = builder.Build();

app.UseOpenApi();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();