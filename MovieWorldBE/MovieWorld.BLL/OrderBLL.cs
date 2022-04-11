using MovieWorld.EF;
using MovieWorld.EF.Context;
using MovieWorld.EF.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace MovieWorld.BLL
{
    public class OrderBLL
    {

        public static void addNewOrder(string connectionString, Order o)
        {
           
            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {
                context.Order.Add(o);
                context.SaveChanges();
            }

        }

       
    }
}
