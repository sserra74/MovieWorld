using Microsoft.Data.SqlClient;
using MovieWorld.EF;
using MovieWorld.EF.Context;
using MovieWorld.EF.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieWorld.BLL
{
    public class UserBLL
    {

        public static void addNewUser(string connectionString, User u)
        {
           
                 
            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {

             
                context.User.Add(u);
                context.SaveChanges();

            }

        }

        public static List<User> getUsers(string connectionString)
        {
  
            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {


                return (from s in context.User
                       select s).ToList();


            }
        }

        public static List<Admin> getAdmin(string connectionString)
        {

            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {


                return (from a in context.Admin
                        select a).ToList();


            }
        }

        public static void deleteUser(string connectionString, Guid id)
        {
            
            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {

                User user = (from u in context.User
                             where u.UserId == id
                             select u).FirstOrDefault();


                context.User.Remove(user);

                context.SaveChanges();
            }

        }

        public static void updateUser(string connectionString, User us)
        {

            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {

               
                foreach(User u in context.User)
                {
                    if (u.UserId == us.UserId)
                    {
                        if(u.Email!=us.Email)
                            u.Email = us.Email;
                        if(u.Password!=us.Password)
                            u.Password = us.Password;
                        if (u.Username != us.Username)
                            u.Username = us.Username;
                    }
                }
                

                context.SaveChanges();
            }

        }


    }
}
