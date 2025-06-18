namespace BikeRoutesApi.Entities;

public class User
{
    public long Id { get; set; }

    public string FirstName { get; set; } = string.Empty;

    public string LastName { get; set; } = string.Empty;

    public string Email { get; set; } = string.Empty;

    public string Phone { get; set; } = string.Empty;

    public string Photo { get; set; } = string.Empty;

    public ICollection<BikeRoute> BikeRoutes { get; set; } = [];
    public ICollection<FavoriteBikeRoute> FavoriteBikeRoutes { get; set; } = [];
}
