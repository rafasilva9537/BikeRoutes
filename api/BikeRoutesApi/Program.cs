using BikeRoutesApi.Startup;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.AddCustomDbContext();

builder.Services.AddCustomControllers();
builder.Services.AddRouting(options => options.LowercaseUrls = true);

var app = builder.Build();

app.UseOpenApi();
app.UseDatabase();

app.UseHttpsRedirection();

app.MapControllers();

app.Run();