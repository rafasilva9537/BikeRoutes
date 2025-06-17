using BikeRoutesApi.Dtos;
using BikeRoutesApi.Entities;

namespace BikeRoutesApi.Mappers;

public static class BikeRouteMappers
{
    // Entity to Dto
    public static BikeRouteMainInfoDto ToBikeRouteMainInfoDto(this BikeRoute bikeRouteEntity)
    {
        return new BikeRouteMainInfoDto(
            Id: bikeRouteEntity.Id,
            Title: bikeRouteEntity.Title,
            Image: bikeRouteEntity.Image,
            Duration: bikeRouteEntity.Duration,
            Distance: bikeRouteEntity.Distance,
            Rating: bikeRouteEntity.Rating,
            UserMainInfo: new UserMainInfoDto(
                Id: bikeRouteEntity.User.Id,
                FirstName: bikeRouteEntity.User.FirstName,
                LastName: bikeRouteEntity.User.LastName,
                Photo: bikeRouteEntity.User.Photo
            )
        );
    }

    public static BikeRouteDetailsDto ToBikeRouteDetailsDto(this BikeRoute bikeRouteEntity)
    {
        return new BikeRouteDetailsDto(
            Id: bikeRouteEntity.Id,
            Title: bikeRouteEntity.Title,
            Image: bikeRouteEntity.Image,
            Duration: bikeRouteEntity.Duration,
            Distance: bikeRouteEntity.Distance,
            Rating: bikeRouteEntity.Rating,
            StartPath: new PointDto(bikeRouteEntity.StartPath.X, bikeRouteEntity.StartPath.Y),
            EndPath: new PointDto(bikeRouteEntity.EndPath.X, bikeRouteEntity.EndPath.Y),
            AverageSpeed: bikeRouteEntity.AverageSpeed,
            UserMainInfo: new UserMainInfoDto(
                Id: bikeRouteEntity.User.Id,
                FirstName: bikeRouteEntity.User.FirstName,
                LastName: bikeRouteEntity.User.LastName,
                Photo: bikeRouteEntity.User.Photo
            )
        );
    }
    
    // Dto to Entity
}