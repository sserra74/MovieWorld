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
    public class NewsController : Controller
    {
        private readonly IConfiguration _configuration;
        public NewsController(IConfiguration config)
        {
            _configuration = config;
        }


        public IActionResult Index()
        {
            return View();
        }

        [HttpGet("{language}")]

        public IEnumerable<dynamic> GetNewsList(string language)
        {

            return NewsBLL.getNews(_configuration.GetConnectionString("movieDB"), language);
        }

        [HttpDelete("{id}/{language}")]
        public void DeleteNews(Guid id, string language)
        {

            NewsBLL.deleteNews(_configuration.GetConnectionString("movieDB"), id, language);
        }

        [HttpPut]
        public void UpdateNews([FromBody] News news)
        {

            NewsBLL.updateNews(_configuration.GetConnectionString("movieDB"), news);
        }

        [HttpPost("{language}")]
        public void InsertNews(string language, [FromBody] News news)
        {

            NewsBLL.insertNews(_configuration.GetConnectionString("movieDB"), language, news);
        }
        [HttpGet("{id}/{language}")]
        public IEnumerable<dynamic> GetOnlyOneNews(Guid id,string language )
        {

            return NewsBLL.getOnlyOneNews(_configuration.GetConnectionString("movieDB"), id, language);
        }

    }
}
