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
    public class NewsLabelBLL
    {

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

                NewsLabel nl = (from n in context.NewsLabel
                                where n.IdNews == id
                                select n).FirstOrDefault();

                if (nl != null)
                {
                    try
                    {
                        context.NewsLabel.Remove(nl);

                        context.SaveChanges();
                    }
                    catch (Exception ex)
                    {

                    }
                }
            }

        }


        public static void updateNews(string connectionString, NewsLabel news)
        {

            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {


                foreach (NewsLabel n in context.NewsLabel)
                {
                    if (n.IdNews == news.IdNews)
                    {
                        if (n.Text != news.Text)
                            n.Text = news.Text;
                        if (n.Title != news.Title)
                            n.Title = news.Title;
                        if (n.SubTitle != news.SubTitle)
                            n.SubTitle = news.SubTitle;


                    }
                }


                context.SaveChanges();
            }

        }

        public static void insertNews(string connectionString, NewsLabel nl)
        {
            Console.WriteLine("sono dentr");

            //Creo una variabile context di tipo ArchivioFilmContext che prende l'oggetto ArchivioFilmContext
            //restituito dal metodo GenerateArchiviofilmContext contenuto in ContextHelper.
            //Con la direttiva using genera l'oggetto dentro le parentesi che ha effetto solo all'interno di quello scope. 
            //Al di fuori viene eliminato e quindi la Garbage Collector viene gestita in maniera implicita senza allocare 
            //o deallocare gli oggetti esplicitamente
            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
           {
               /* NewsLabel nl = new NewsLabel();
                nl.Title = news.Title;
                nl.Text = news.Text;
                nl.SubTitle = news.SubTitle;
                nl.IdNews = news.IdNews;
                if (language == "it")
                    nl.Idmultilingual = new Guid("f24d1158-8400-4f03-9187-233bfc53f5fb");
                else
                    nl.Idmultilingual = new Guid("47f038f1-2278-4867-bc60-b4e2d12402b0");*/
                //nl.IdNews = Guid.NewGuid();

                context.NewsLabel.Add(nl);

               context.SaveChanges();
           }

        }

    }


}
