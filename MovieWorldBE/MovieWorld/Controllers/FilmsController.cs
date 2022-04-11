using Microsoft.AspNetCore.Mvc;
using MovieWorld.BLL;
using MovieWorld.EF.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.IO;
using System.Net.Http.Headers;
using MovieWorld.EF.Context;
using MovieWorld.EF;
using Microsoft.AspNetCore.Http;

namespace MovieWorld.NET5.Controllers
{
    [Route("api/[controller]/[action]/{id?}/{language?}")]

    [ApiController]
    public class FilmsController : Controller
    {
        private readonly IConfiguration _configuration;
        public FilmsController(IConfiguration config)
        {
            _configuration = config;
        }
        public IActionResult Index(int ? id)
        {
            return View();
        }

        [HttpGet]
        public IEnumerable<dynamic> GetFilmList(int? id, string language)
        {
          
            return MovieBLL.getFilms(_configuration.GetConnectionString("movieDB"), id, language);
        }

        [HttpGet]
        public IEnumerable<dynamic> GetFilm(Guid id, string language)
        {

            return MovieBLL.getFilm(_configuration.GetConnectionString("movieDB"), id, language);
        }

        [HttpGet] //no
        public IEnumerable<dynamic> GetFilmForCart(int? id, string language)
        {

            return MovieBLL.getFilmsForCart(_configuration.GetConnectionString("movieDB"), id, language);
        }

        [HttpGet]
       
        public List<Film> GetFilmForKind(int id, String kinds)
        {

            return MovieBLL.getFilmsForKind(_configuration.GetConnectionString("movieDB"),id);
        }
        [HttpGet]
        public List<Film> GetFilmForKind2( int id,string kinds)
        {

            return MovieBLL.getFilmsForKind2(_configuration.GetConnectionString("movieDB"), id);
        }

        [HttpPut]
        public void UpdateAvailability(Guid id, string language, [FromBody] int availability)
        {

            MovieBLL.updateAvailability(_configuration.GetConnectionString("movieDB"),id,language, availability);
        }

        [HttpPost]
        public void InsertMovie(Guid id, string language, [FromBody] Film movie)
        {

            MovieBLL.insertMovie(_configuration.GetConnectionString("movieDB"),id, language, movie);
        }

        [HttpDelete]
        public void DeleteMovie(Guid id, string language)
        {

            FilmLabelBLL.deleteMovie(_configuration.GetConnectionString("movieDB"), id, language);
        }


        [HttpPut]
        public void UpdateMovie([FromBody] Film film)
        {

            MovieBLL.updateMovie(_configuration.GetConnectionString("movieDB"),film);
        }


        [HttpPost, DisableRequestSizeLimit]
        public async Task<IActionResult> uploadImage()
        {

            try
            {


                //Cattura il body passato nella richiesta come form e ne prende il file
                IFormFile file = Request.Form.Files[0];
                //Ottengo il percorso in cui salvare l'immagine
                string folderName = Path.Combine("Resources", "Images");
                //Creo il percorso completo dalla cartella corrente a quella in cui devo salvare l'immagine
                string pathToSave = Path.Combine(Directory.GetCurrentDirectory(), folderName);

                //Se il file è stato passato correttamente
                if (file.Length > 0)
                {
                    //Estraggo il nome del file
                    var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    //Otteniamo il path completo lato server per salvare il file compreso anche del nome del file
                    var fullPath = Path.Combine(pathToSave, fileName);
                    //Ottengo il percorso che verrà salvato sul database
                    var dbPath = Path.Combine(folderName, fileName);
                   
                    //Definisco uno stream (sequenza di dati) creando il file in quel path e lo apre in scrittura
                    using (Stream stream = new FileStream(file.FileName, FileMode.Create, FileAccess.Write))
                    {
                        //copio il contenuto del file sullo stream
                       file.CopyTo(stream);
                        
                    }

                   using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(_configuration.GetConnectionString("movieDB")))
                    {
                        Console.WriteLine("Connessione stabilita");

                        foreach (Film f in context.Film)
                            if (f.FilmId == new Guid("5a3f234e-77c4-4cb6-bc95-02dc7e643e6b"))
                                f.LinkImg = dbPath;

                    }

                    return Ok(new { dbPath });


                }
                else
                    return BadRequest();

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
