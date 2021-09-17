using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Stratis.MarketPlace.Core;

namespace Project20.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };
        private readonly IHubContext<StoreClientHub, IStoreClientHub> storeHub;

        public WeatherForecastController(IHubContext<StoreClientHub, IStoreClientHub> storeHub)
        {
            this.storeHub = storeHub;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            storeHub.Clients.All.SendMessage("heyooo!");

            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}