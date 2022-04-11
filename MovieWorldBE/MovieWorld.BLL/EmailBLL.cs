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
    public class EmailBLL
    {

        public static List<Email> getEmailList(string connectionString)
        {
            Console.WriteLine("sono dentr");
            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {
                Console.WriteLine("Connessione stabilita");
                return (from e in context.Email
                       select e).ToList();
            }

        }


        public static void addNewEmail(string connectionString, Email email)
        {
            Console.WriteLine("sono dentr");

            //Creo una variabile context di tipo ArchivioFilmContext che prende l'oggetto ArchivioFilmContext
            //restituito dal metodo GenerateArchiviofilmContext contenuto in ContextHelper.
            //Con la direttiva using genera l'oggetto dentro le parentesi che ha effetto solo all'interno di quello scope. 
            //Al di fuori viene eliminato e quindi la Garbage Collector viene gestita in maniera implicita senza allocare 
            //o deallocare gli oggetti esplicitamente
            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {

                Console.WriteLine("Connessione stabilita");
                context.Email.Add(email);

                context.SaveChanges();
            }

        }

        public static void updateEmail(string connectionString, Email email)
        {

            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {


                foreach (Email e in context.Email)
                {
                    if (e.IdEmail == email.IdEmail)
                    {
                        if (e.Title != email.Title)
                            e.Title = email.Title;
                        if (e.Object != email.Object)
                            e.Object = email.Object;
                        if (e.Body != email.Body)
                            e.Body = email.Body;
                        if (e.Keyword != email.Keyword)
                            e.Keyword = email.Keyword;
                    }
                }

                
                context.SaveChanges();
            }

        }


    

        public static void deleteEmail(string connectionString, Guid id)
        {

            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {

                Email email = (from e in context.Email
                             where e.IdEmail == id
                             select e).FirstOrDefault();


                context.Email.Remove(email);

                context.SaveChanges();
            }

        }

        public static Email getSpecificEmail(string connectionString, string keyword)
        {
            Console.WriteLine("sono dentr");
            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {
                Console.WriteLine("Connessione stabilita");
                return (from e in context.Email
                        where e.Keyword==keyword
                        select e).FirstOrDefault();
            }

        }

        public static void sendEmail(string connectionString, Dictionary<string, string> data)
        {

            string body;
            Email e = EmailBLL.getSpecificEmail(connectionString, data["keyword"]);
            body = e.Body.ToString();

            //ciao #userbane#

            if (data["keyword"] == "registration")
            {
                body = body.Replace('#', ' ');
                body = body.Replace(data["keyword"], data["userData"]);
            }

            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.gmail.com";
            smtp.Port = 587;
            smtp.EnableSsl = true;
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
            // smtp.UseDefaultCredentials = true;

            smtp.Credentials = new System.Net.NetworkCredential("movieworldwebsite2022@gmail.com", "ComproTantiFilm2022!");
            using (MailMessage mail = new MailMessage())
            {
                mail.From = new MailAddress("movieworldwebsite2022@gmail.com");
                mail.To.Add("pepesergio96@gmail.com"); // data["email"]
                mail.Subject = e.Title;
                mail.Body = body;
                mail.IsBodyHtml = true;

                smtp.Send(mail);
            }
        }

    }
}

