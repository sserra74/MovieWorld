using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using MovieWorld.BLL;
using MovieWorld.EF.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MovieWorld.NET5.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class DeliveryPointController : Controller
    {
        
        private readonly IConfiguration _configuration;
        public DeliveryPointController(IConfiguration config)
        {
            _configuration = config;
        }
        public IActionResult Index()
        {
            return View();
        }


        [HttpGet]
        public List<DeliveryPoint> GetDeliveryPoint()
        {

            return DeliveryPointBLL.getDeliveryPoint(_configuration.GetConnectionString("movieDB"));
        }
    }
}
