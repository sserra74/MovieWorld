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
    [Route("api/[controller]/[action]/{id?}")]
    [ApiController]
    public class CastController : Controller
    {
        private readonly IConfiguration _configuration;
        public CastController(IConfiguration config)
        {
            _configuration = config;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IEnumerable<dynamic> GetMovieDirector(Guid id)
        {

            return CastBLL.findMovieDirector(_configuration.GetConnectionString("movieDB"), id);
        }

        [HttpGet]
        public IEnumerable<dynamic> GetMovieActors(Guid id)
        {

            return CastBLL.findMovieActors(_configuration.GetConnectionString("movieDB"), id);
        }
    }
}
