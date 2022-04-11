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
    public class NewsLabelController : Controller
    {
        private readonly IConfiguration _configuration;
        public NewsLabelController(IConfiguration config)
        {
            _configuration = config;
        }

        public IActionResult Index()
        {
            return View();
        }
        [HttpDelete("{id}/{language?}")]
        public void DeleteNews(Guid id, string language)
        {

            NewsLabelBLL.deleteNews(_configuration.GetConnectionString("movieDB"), id, language);


        }

        [HttpPost]
        public void InsertNews([FromBody] NewsLabel nl)
        {

            NewsLabelBLL.insertNews(_configuration.GetConnectionString("movieDB"),nl);
        }

        [HttpPut]
        public void UpdateNews([FromBody] NewsLabel nl)
        {

            NewsLabelBLL.updateNews(_configuration.GetConnectionString("movieDB"), nl);
        }
    }
}
