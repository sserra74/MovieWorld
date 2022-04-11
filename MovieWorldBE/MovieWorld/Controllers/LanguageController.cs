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
    public class LanguageController : Controller
    {
        private readonly IConfiguration _configuration;
        public LanguageController(IConfiguration config)
        {
            _configuration = config;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public List<Multilingual> GetLanguageList()
        {

            return LanguageBLL.getLanguages(_configuration.GetConnectionString("movieDB"));
        }
    }
}
