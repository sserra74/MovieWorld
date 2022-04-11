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
    [Route("api/[controller]/[action]/{language?}")]

    [ApiController]
    public class LabelController : Controller
    {
        private readonly IConfiguration _configuration;
        public LabelController(IConfiguration config)
        {
            _configuration = config;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IEnumerable<dynamic> GetLabelByLanguageHeader(string language)
        {

            return LabelsBLL.getLabelByLanguageHeader(_configuration.GetConnectionString("movieDB"), language);
        }

        [HttpGet]
        public IEnumerable<dynamic> GetLabelByLanguageDetailPage(string language)
        {

            return LabelsBLL.getLabelByLanguageDetailPage(_configuration.GetConnectionString("movieDB"), language);
        }
        [HttpGet]
        public IEnumerable<dynamic> GetLabelByLanguageCatalogPage(string language)
        {

            return LabelsBLL.getLabelByLanguageCatalogPage(_configuration.GetConnectionString("movieDB"), language);
        }

        [HttpGet]
        public IEnumerable<dynamic> GetLabelByLanguageDeliveryPointPage(string language)
        {

            return LabelsBLL.getLabelByLanguageDeliveryPointPage(_configuration.GetConnectionString("movieDB"), language);
        }

        [HttpGet]
        public IEnumerable<dynamic> GetLabelByLanguageCartPage(string language)
        {

            return LabelsBLL.getLabelByLanguageCartPage(_configuration.GetConnectionString("movieDB"), language);
        }

        [HttpGet]
        public IEnumerable<dynamic> GetLabelByLanguageBOPage(string language)
        {

            return LabelsBLL.getLabelByLanguageBOPage(_configuration.GetConnectionString("movieDB"), language);
        }
    }
}
