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
    [Route("api/[controller]/[action]/{id?}/{language?}")]
    [ApiController]
    public class FilmGenreController : Controller
    {
        private readonly IConfiguration _configuration;

        public FilmGenreController(IConfiguration config)
        {
            _configuration = config;
        }
        public IActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public List<Genre> GetFilmGenre(Guid id, string language)
        {

            return FilmGenreBLL.getFilmGenre(_configuration.GetConnectionString("movieDB"), id, language);
        }

        [HttpGet]
        public IEnumerable<dynamic> GetAdviceFilm(Guid id)
        {

            return FilmGenreBLL.adviceFilm(_configuration.GetConnectionString("movieDB"), id);
        }

        [HttpGet]
        public IEnumerable<dynamic> GetFilmByGenre()
        {

            return FilmGenreBLL.getFilmByGenre(_configuration.GetConnectionString("movieDB"));
        }

    }
}
