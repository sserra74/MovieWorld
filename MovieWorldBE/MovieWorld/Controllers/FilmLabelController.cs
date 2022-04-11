using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using MovieWorld.EF.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MovieWorld.BLL;
using Newtonsoft.Json.Linq;

namespace MovieWorld.NET5.Controllers
{

    [Route("api/[controller]/[action]/{id?}/{language?}")]

    [ApiController]
    public class FilmLabelController : Controller
    {
        private readonly IConfiguration _configuration;
        public FilmLabelController(IConfiguration config)
        {
            _configuration = config;
        }
       /* public IActionResult Index(int? id)
        {
            return View();
        }*/
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public void InsertMovie(Guid id, string language, [FromBody] Dictionary<string, string> data)
        {

            FilmLabelBLL.insertMovie(_configuration.GetConnectionString("movieDB"), id, language, data);
        }

        [HttpDelete]
        public void DeleteMovie(Guid id, string language)
        {

            FilmLabelBLL.deleteMovie(_configuration.GetConnectionString("movieDB"), id, language);
        }

        [HttpPut]
        public void UpdateMovie(Guid id, [FromBody]Dictionary<string, string> data)
        {

            FilmLabelBLL.updateMovie(_configuration.GetConnectionString("movieDB"), id, data);
        }
    }
}
