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
    public class NewsBLL
    {

        public static IEnumerable<dynamic> getNews(string connectionString, string language)
        {
            Console.WriteLine("sono dentr");
            //List<News> list = new List<News>();

            //Creo una variabile context di tipo ArchivioFilmContext che prende l'oggetto ArchivioFilmContext
            //restituito dal metodo GenerateArchiviofilmContext contenuto in ContextHelper.
            //Con la direttiva using genera l'oggetto dentro le parentesi che ha effetto solo all'interno di quello scope. 
            //Al di fuori viene eliminato e quindi la Garbage Collector viene gestita in maniera implicita senza allocare 
            //o deallocare gli oggetti esplicitamente
            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {
                Console.WriteLine("Connessione stabilita");
                return (from n in context.News 
                       from nl in context.NewsLabel
                       where n.NewsId == nl.IdNews
                       from m in context.Multilingual
                       where nl.Idmultilingual==m.Id && m.Language==language 
                       select new {nl.IdNews, nl.Title, nl.SubTitle, nl.Text, n.Image}).ToList();


                    
              
            }

           

            //salvataggio chiamare context.save

        }


        public static void deleteNews(string connectionString, Guid id, string language)
        {
            Console.WriteLine("sono dentr");

            //Creo una variabile context di tipo ArchivioFilmContext che prende l'oggetto ArchivioFilmContext
            //restituito dal metodo GenerateArchiviofilmContext contenuto in ContextHelper.
            //Con la direttiva using genera l'oggetto dentro le parentesi che ha effetto solo all'interno di quello scope. 
            //Al di fuori viene eliminato e quindi la Garbage Collector viene gestita in maniera implicita senza allocare 
            //o deallocare gli oggetti esplicitamente
            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {

                News news = (from n in context.News
                             where n.NewsId == id
                             select n).FirstOrDefault();


                context.News.Remove(news);

                context.SaveChanges();
            }

        }

        //da fare quando si fa l'immagine
        public static void updateNews(string connectionString, News news)
        {

            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {


                foreach (News n in context.News)
                {
                    if (n.NewsId == news.NewsId)
                    {
                       

                    }
                }


                context.SaveChanges();
            }

        }


        public static void insertNews(string connectionString, string language, News news)
        {
            Console.WriteLine("sono dentr");

            //Creo una variabile context di tipo ArchivioFilmContext che prende l'oggetto ArchivioFilmContext
            //restituito dal metodo GenerateArchiviofilmContext contenuto in ContextHelper.
            //Con la direttiva using genera l'oggetto dentro le parentesi che ha effetto solo all'interno di quello scope. 
            //Al di fuori viene eliminato e quindi la Garbage Collector viene gestita in maniera implicita senza allocare 
            //o deallocare gli oggetti esplicitamente
            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {


              

                /*Film fff = (from m in movies
                            select new
                            {
                                m.FilmId,
                                m.Format,
                                m.Price,
                                m.Year,
                                m.IsSalable,
                                m.Cult,
                                m.Bgimage,
                                m.LinkImg
                            }).ToList();*/

                Console.WriteLine("Connessione stabilita");
                context.News.Add(news);

                context.SaveChanges();
            }

        }

        public static IEnumerable<dynamic> getOnlyOneNews(string connectionString,Guid id , string language)
        {
            Console.WriteLine("sono dentr");
            //List<News> list = new List<News>();

            //Creo una variabile context di tipo ArchivioFilmContext che prende l'oggetto ArchivioFilmContext
            //restituito dal metodo GenerateArchiviofilmContext contenuto in ContextHelper.
            //Con la direttiva using genera l'oggetto dentro le parentesi che ha effetto solo all'interno di quello scope. 
            //Al di fuori viene eliminato e quindi la Garbage Collector viene gestita in maniera implicita senza allocare 
            //o deallocare gli oggetti esplicitamente
            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {
                Console.WriteLine("Connessione stabilita");
                return (from n in context.News
                        from nl in context.NewsLabel
                        where n.NewsId==id && n.NewsId == nl.IdNews
                        from m in context.Multilingual
                        where nl.Idmultilingual == m.Id && m.Language == language
                        select new { nl.IdNews, nl.Title, nl.SubTitle, nl.Text, n.Image }).ToList();




            }



            //salvataggio chiamare context.save

        }


    }
}
