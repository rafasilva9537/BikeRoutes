namespace BikeRoutesApi.Entities;

public class FavoriteBikeRoute
{
    public long UserId { get; set; }
    public long BikeRouteId { get; set; }
    
    public User User { get; set; } = null!;
    public BikeRoute BikeRoute { get; set; } = null!;
}