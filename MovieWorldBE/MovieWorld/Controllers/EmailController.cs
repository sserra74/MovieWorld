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
    public class EmailController : Controller
    {
        private readonly IConfiguration _configuration;
        public EmailController(IConfiguration config)
        {
            _configuration = config;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public List<Email> GetEmailList()
        {

            return EmailBLL.getEmailList(_configuration.GetConnectionString("movieDB"));
        }

        [HttpGet]
        public Email GetSpecifiEmail(string keyword)
        {

            return EmailBLL.getSpecificEmail(_configuration.GetConnectionString("movieDB"), keyword);
        }

        [HttpPost]
        public void AddNewEmail([FromBody] Email email)
        {

            EmailBLL.addNewEmail(_configuration.GetConnectionString("movieDB"), email);
        }

        [HttpPut]
        public void UpdateEmail([FromBody] Email email)
        {

            EmailBLL.updateEmail(_configuration.GetConnectionString("movieDB"), email);
        }

        [HttpDelete("{id}")]
        public void DeleteEmail(Guid id)
        {

            EmailBLL.deleteEmail(_configuration.GetConnectionString("movieDB"), id);
        }

        [HttpPost]
        public void SendEmail([FromBody] Dictionary<string, string> data)
        {

            EmailBLL.sendEmail(_configuration.GetConnectionString("movieDB"), data);
        }
    }
}
