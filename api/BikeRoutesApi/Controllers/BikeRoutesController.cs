using Microsoft.AspNetCore.Mvc;

namespace BikeRoutesApi.Controllers;

[ApiController]
[Route("bike-routes")]
public class BikeRoutesController : ControllerBase
{
    [HttpGet]
    public ActionResult<string> GetAllBikeRoutes()
    {
        return Ok();
    }

    [HttpPost]
    public ActionResult<string> CreateBikeRoute()
    {
        return Ok();
    }
    
    [HttpGet("{id:int}")]
    public ActionResult<string> GetBikeRouteById(int recipeId)
    {
        return Ok();
    }
}