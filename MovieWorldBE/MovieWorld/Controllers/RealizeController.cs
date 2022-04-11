
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
    public class RealizeController : Controller
    {
        private readonly IConfiguration _configuration;
        public RealizeController(IConfiguration config)
        {
            _configuration = config;
        }
        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
   

       
    }
}