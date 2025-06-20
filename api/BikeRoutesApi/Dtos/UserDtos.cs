﻿namespace BikeRoutesApi.Dtos;

public record UserDto(
    long Id,
    string FirstName,
    string LastName,
    string Email,
    string Phone,
    string Photo
);

public record UserMainInfoDto(
    long Id,
    string FirstName,
    string LastName,
    string Photo
);