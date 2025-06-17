using BikeRoutesApi.Data;
using BikeRoutesApi.Dtos;
using BikeRoutesApi.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BikeRoutesApi.Controllers;

[ApiController]
[Route("accounts")]
public class AccountsController : ControllerBase
{
    private readonly ILogger<AccountsController> _logger;
    private readonly BikeRoutesDbContext _dbContext;
    
    public AccountsController(ILogger<AccountsController> logger, BikeRoutesDbContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }
    
    [HttpGet]
    public async Task<ActionResult<IList<UserDto>>> GetAllUsers()
    {
        var users = await _dbContext.Users
            .Select(u => u.ToUserDto())
            .ToListAsync();
        
        return Ok(users);
    }

    [HttpGet("{userId:long}")]
    public async Task<ActionResult<UserDto>> GetUserById(long userId)
    {
        var userEntity = await _dbContext.Users.FindAsync(userId);
        if(userEntity is null) return NotFound();
        
        var userDto = userEntity.ToUserDto();
        return Ok(userDto);
    }
}