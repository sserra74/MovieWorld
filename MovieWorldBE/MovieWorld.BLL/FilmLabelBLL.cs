using Microsoft.EntityFrameworkCore;
using MovieWorld.EF;
using MovieWorld.EF.Context;
using MovieWorld.EF.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieWorld.BLL
{
    public class FilmLabelBLL
    {

        public static void insertMovie(string connectionString, Guid id, string language, Dictionary<string, string> data)
        {
            Console.WriteLine("sono dentr");

            //Creo una variabile context di tipo ArchivioFilmContext che prende l'oggetto ArchivioFilmContext
            //restituito dal metodo GenerateArchiviofilmContext contenuto in ContextHelper.
            //Con la direttiva using genera l'oggetto dentro le parentesi che ha effetto solo all'interno di quello scope. 
            //Al di fuori viene eliminato e quindi la Garbage Collector viene gestita in maniera implicita senza allocare 
            //o deallocare gli oggetti esplicitamente
            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {
                FilmLabel fl = new FilmLabel();

                fl.Title = data["title"];
                fl.ShortPlot = data["shortPlot"];
                fl.IdFilm = id;
                if (language == "it")
                    fl.IdMultilingual = new Guid("f24d1158-8400-4f03-9187-233bfc53f5fb");
                else
                    fl.IdMultilingual = new Guid("47f038f1-2278-4867-bc60-b4e2d12402b0");
                fl.Id = Guid.NewGuid();
               
                context.FilmLabel.Add(fl);

                context.SaveChanges();
            }

        }


        public static void deleteMovie(string connectionString, Guid id, string language)
        {
            Console.WriteLine("sono dentr");

            //Creo una variabile context di tipo ArchivioFilmContext che prende l'oggetto ArchivioFilmContext
            //restituito dal metodo GenerateArchiviofilmContext contenuto in ContextHelper.
            //Con la direttiva using genera l'oggetto dentro le parentesi che ha effetto solo all'interno di quello scope. 
            //Al di fuori viene eliminato e quindi la Garbage Collector viene gestita in maniera implicita senza allocare 
            //o deallocare gli oggetti esplicitamente
            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {

                FilmLabel fl = (from f in context.FilmLabel
                                where f.IdFilm == id
                                select f).FirstOrDefault();

                if (fl != null)
                {
                    try
                    {
                        context.FilmLabel.Remove(fl);

                         context.SaveChanges();
                    }
                    catch(Exception ex)
                    {

                    }
                }
            }

        }
    

        public static void updateMovie(string connectionString, Guid id, Dictionary<string, string> data)
        {

            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {


                foreach (FilmLabel f in context.FilmLabel)
                {
                    if (f.IdFilm == id)
                    {
                        if (f.Title != data["title"])
                            f.Title = data["title"];
                        if (f.ShortPlot != data["shortPlot"])
                            f.ShortPlot = data["shortPlot"];
                   

                    }
                }


                context.SaveChanges();
            }

        }
    }
}
