namespace BikeRoutesApi.Dtos;

public record BikeRouteDetailsDto(
    long Id,
    string Title,
    string Description,
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
    string Title,
    string Description,
    string Image,
    PointDto StartPath,
    PointDto EndPath,
    double Duration
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

public record MyBikeRouteDto(
    long Id,
    string Title,
    string Image,
    double Duration,
    double Distance,
    double Rating,
    string UserName
);