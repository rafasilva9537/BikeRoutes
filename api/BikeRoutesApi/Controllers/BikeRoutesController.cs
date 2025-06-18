using BikeRoutesApi.Data;
using BikeRoutesApi.Dtos;
using BikeRoutesApi.Mappers;
using BikeRoutesApi.Utils;
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
    public async Task<ActionResult<BikeRouteDetailsDto>> CreateBikeRoute(CreateBikeRouteDto createBikeRouteDto)
    {
        var loggedUser = await _dbContext.Users.FirstOrDefaultAsync(br => br.Id == 1);
        
        var createdBikeRoute = createBikeRouteDto.ToBikeRoute();
        createdBikeRoute.User = loggedUser;
        createdBikeRoute.Distance = GeographyUtils.CalculateHaversineDistance(createdBikeRoute.StartPath, createdBikeRoute.EndPath);
        createdBikeRoute.AverageSpeed = createdBikeRoute.Distance / (createdBikeRoute.Duration/60);
        
        _dbContext.BikeRoutes.Add(createdBikeRoute);
        await _dbContext.SaveChangesAsync();

        var bikeRouteDetailsDto = createdBikeRoute.ToBikeRouteDetailsDto();
        
        return CreatedAtAction(nameof(GetBikeRouteById), new { routeId = createdBikeRoute.Id }, bikeRouteDetailsDto);
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
    
    [HttpGet("favorites")]
    public async Task<ActionResult<List<BikeRouteMainInfoDto>>> GetFavoriteBikeRoutes()
    {
        var loggedUser = await _dbContext.Users.FirstOrDefaultAsync(br => br.Id == 1);
        if(loggedUser is null) return NotFound();
        
        var favoriteBikeRoutes = await _dbContext.FavoriteBikeRoutes
            .Where(br => br.UserId == loggedUser.Id)
            .Include(br => br.BikeRoute)
            .ThenInclude(br => br.User)
            .Select(br => br.BikeRoute.ToBikeRouteMainInfoDto())
            .ToListAsync();
        
        return Ok(favoriteBikeRoutes);
    }

    [HttpGet("my-routes")]
    public async Task<ActionResult<BikeRouteMainInfoDto>> GetMyBikeRoutes()
    {
        var loggedUser = await _dbContext.Users.FirstOrDefaultAsync(br => br.Id == 1);
        if(loggedUser is null) return NotFound();
        
        var myBikeRoutes = await _dbContext.BikeRoutes
            .Where(br => br.UserId == loggedUser.Id)
            .Include(br => br.User)
            .Select(br => br.ToBikeRouteMainInfoDto())
            .ToListAsync();
        
        return Ok(myBikeRoutes);
    }
}