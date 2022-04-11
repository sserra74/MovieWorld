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
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UserController : Controller
    {
        private readonly IConfiguration _configuration;
        public UserController(IConfiguration config)
        {
            _configuration = config;
        }
        public IActionResult Index()
        {
            return View();
        }
     
        [HttpGet]
       
        public List<User> GetUsers()
        {

           return UserBLL.getUsers(_configuration.GetConnectionString("movieDB"));
        }

        [HttpGet]
        public List<Admin> GetAdmin()
        {

            return UserBLL.getAdmin(_configuration.GetConnectionString("movieDB"));
        }


        [HttpPost]
        public void AddNewUser (User u)
        {

            UserBLL.addNewUser(_configuration.GetConnectionString("movieDB"),u);
        }

        [HttpDelete("{id}")]
        
        public void deleteUser( Guid id)
        {

            UserBLL.deleteUser(_configuration.GetConnectionString("movieDB"), id);
        }

        [HttpPut]

        public void UpdateUser([FromBody]  User u)
        {

            UserBLL.updateUser(_configuration.GetConnectionString("movieDB"), u);
        }
    }
}
