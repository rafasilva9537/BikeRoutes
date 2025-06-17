using BikeRoutesApi.Dtos;
using BikeRoutesApi.Entities;

namespace BikeRoutesApi.Mappers;

public static class UserMappers
{
    public static UserDto ToUserDto(this User userEntity)
    {
        return new UserDto(
            Id: userEntity.Id,
            FirstName: userEntity.FirstName,
            LastName: userEntity.LastName,
            Email: userEntity.Email,
            Phone: userEntity.Phone,
            Photo: userEntity.Photo
        );
    }
}