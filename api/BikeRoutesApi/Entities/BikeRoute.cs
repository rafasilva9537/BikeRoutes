using NetTopologySuite.Geometries;

namespace BikeRoutesApi.Entities;

public class BikeRoute
{
    public long Id { get; set; }

    public long UserId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Image { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public double Duration { get; set; }

    public double Distance { get; set; }

    public double Rating { get; set; }

    public double? AverageSpeed { get; set; }

    public DateTimeOffset CreatedAt { get; set; }

    public DateTimeOffset UpdatedAt { get; set; }

    public Point StartPath { get; set; } = null!;

    public Point EndPath { get; set; } = null!;

    public LineString? PathRoutes { get; set; }

    public User User { get; set; } = null!;
}
