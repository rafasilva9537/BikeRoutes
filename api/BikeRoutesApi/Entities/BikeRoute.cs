using System;
using System.Collections.Generic;
using NetTopologySuite.Geometries;

namespace BikeRoutesApi.Entities;

public partial class BikeRoute
{
    public long Id { get; set; }

    public long UsersId { get; set; }

    public long DataRoutesId { get; set; }

    public string Title { get; set; } = null!;

    public string? Photo { get; set; }

    public string Description { get; set; } = null!;

    public double Duration { get; set; }

    public double Distance { get; set; }

    public double Rating { get; set; }

    public double? AverageSpeed { get; set; }

    public DateTime CreatedAt { get; set; }

    public DateTime UpdatedAt { get; set; }

    public Point StartPath { get; set; } = null!;

    public Point EndPath { get; set; } = null!;

    public LineString? PathRoutes { get; set; }

    public virtual User Users { get; set; } = null!;
}
