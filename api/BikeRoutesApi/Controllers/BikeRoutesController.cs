using BikeRoutesApi.Data;
using BikeRoutesApi.Dtos;
using BikeRoutesApi.Entities;
using BikeRoutesApi.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BikeRoutesApi.Controllers;

[ApiController]
[Route("bike-routes")]
public class BikeRoutesController : ControllerBase
{
    private readonly ILogger<BikeRoutesController> _logger;
    private readonly BikeRoutesDbContext _dbContext;
    
    public BikeRoutesController(ILogger<BikeRoutesController> logger, BikeRoutesDbContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }
    
    
    [HttpGet]
    public async Task<ActionResult<BikeRouteMainInfoDto>> GetAllBikeRoutes()
    {
        var bikeRoutesDtos = await _dbContext
            .BikeRoutes
            .Include(br => br.User)
            .Select(br => br.ToBikeRouteMainInfoDto())
            .ToListAsync();
        
        return Ok(bikeRoutesDtos);
    }
    
    [HttpPost]
    public async Task<ActionResult<BikeRouteDetailsDto>> CreateBikeRoute()
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(br => br.Id == 1);

        var createdBikeRoute = new BikeRoute()
        {
            
        };
        
        return Ok();
    }
    
    [HttpGet("{routeId:long}")]
    public async Task<ActionResult<BikeRouteDetailsDto>> GetBikeRouteById(long routeId)
    {
        var bikeRoute = await _dbContext.BikeRoutes
            .Include(br => br.User)
            .FirstOrDefaultAsync(br => br.Id == routeId);
        
        
        if(bikeRoute is null) return NotFound();
        
        var bikeRouteDto = bikeRoute.ToBikeRouteDetailsDto();
        
        return Ok(bikeRouteDto);
    }
}