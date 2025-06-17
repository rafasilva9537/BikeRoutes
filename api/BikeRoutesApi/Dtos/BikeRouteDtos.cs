namespace BikeRoutesApi.Dtos;

public record BikeRouteDetailsDto(
    long Id,
    string Title,
    string Image,
    double? AverageSpeed,
    double Duration,
    double Distance,
    PointDto StartPath,
    PointDto EndPath,
    double Rating,
    UserMainInfoDto UserMainInfo
);

public record CreateBikeRouteDto(
    long Id,
    string Title,
    string Image,
    double? AverageSpeed,
    double Duration,
    double Distance,
    PointDto StartPath,
    PointDto EndPath,
    long UserId
);

public record BikeRouteMainInfoDto(
    long Id,
    string Title,
    string Image,
    double Duration,
    double Distance,
    double Rating,
    UserMainInfoDto UserMainInfo
);