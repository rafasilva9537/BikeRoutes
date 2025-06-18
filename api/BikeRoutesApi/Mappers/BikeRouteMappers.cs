using BikeRoutesApi.Dtos;
using BikeRoutesApi.Entities;
using NetTopologySuite.Geometries;

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
            Description: bikeRouteEntity.Description,
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

    public static MyBikeRouteDto ToMyBikeRouteDto(this BikeRoute bikeRouteEntity)
    {
        return new MyBikeRouteDto(
            Id: bikeRouteEntity.Id,
            Title: bikeRouteEntity.Title,
            Image: bikeRouteEntity.Image,
            Duration: bikeRouteEntity.Duration,
            Distance: bikeRouteEntity.Distance,
            Rating: bikeRouteEntity.Rating,
            UserName: $"{bikeRouteEntity.User?.FirstName} {bikeRouteEntity.User?.LastName}"
        );
    }
    
    // Dto to Entity
    public static BikeRoute ToBikeRoute(this CreateBikeRouteDto createBikeRouteDto)
    {
        return new BikeRoute()
        {
            Title = createBikeRouteDto.Title,
            Description = createBikeRouteDto.Description,
            Image = createBikeRouteDto.Image,
            StartPath = new Point(createBikeRouteDto.StartPath.X, createBikeRouteDto.StartPath.Y),
            EndPath = new Point(createBikeRouteDto.EndPath.X, createBikeRouteDto.EndPath.Y),
            Duration = createBikeRouteDto.Duration,
        };
    }
}