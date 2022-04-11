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
    public class MovieBLL
    {

        private static List<Film> adviceFilms = new List<Film>();
        public static IEnumerable<dynamic> getFilms(string connectionString, int? id, string language)
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
                return (from m in context.Multilingual
                        from fl in context.FilmLabel
                        where m.Id == fl.IdMultilingual && m.Language == language

                        from f in context.Film

                        where f.FilmId == fl.IdFilm

                        select new { f.FilmId, fl.Title, fl.ShortPlot, f.LinkImg, f.Bgimage, f.Price, f.Year, f.Format, f.IsSalable, f.Availability,f.Cult }).ToList();
                /*  if (list.Any(item => item.LinkImg == null))
                  {
                      list = list.Select(n => { if (n.LinkImg == null) { n.LinkImg = ImageNotAvaiable.ImageNotFound(n.LinkImg); } return n; }).ToList();

                  }*/


            }

            // return list;

            //salvataggio chiamare context.save

        }

        //get dei film senza trama e film perchè si deve aggiornare solo la tabella Film in cui questi campi
        //non sono contenuti
        public static IEnumerable<dynamic> getFilmsForCart(string connectionString, int? id, string language)
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
                return (from m in context.Multilingual
                        from fl in context.FilmLabel
                        where m.Id == fl.IdMultilingual && m.Language == language

                        from f in context.Film

                        where f.FilmId == fl.IdFilm

                        select new { f.FilmId, f.LinkImg, f.Bgimage, f.Price, f.Year, f.Format, f.IsSalable, f.Availability, f.Cult }).ToList();
                /*  if (list.Any(item => item.LinkImg == null))
                  {
                      list = list.Select(n => { if (n.LinkImg == null) { n.LinkImg = ImageNotAvaiable.ImageNotFound(n.LinkImg); } return n; }).ToList();

                  }*/


            }

            // return list;

            //salvataggio chiamare context.save

        }

        public static IEnumerable<dynamic> getFilm(string connectionString, Guid id, string language)
        {
            Console.WriteLine("sono dentr");
            Film film;

            //Creo una variabile context di tipo ArchivioFilmContext che prende l'oggetto ArchivioFilmContext
            //restituito dal metodo GenerateArchiviofilmContext contenuto in ContextHelper.
            //Con la direttiva using genera l'oggetto dentro le parentesi che ha effetto solo all'interno di quello scope. 
            //Al di fuori viene eliminato e quindi la Garbage Collector viene gestita in maniera implicita senza allocare 
            //o deallocare gli oggetti esplicitamente
            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {
                Console.WriteLine("Connessione stabilita");
               return  (from m in context.Multilingual
                              where m.Language == language
                              from fl in context.FilmLabel
                              where fl.IdMultilingual == m.Id && fl.IdFilm==id
                              select new { fl.Title, fl.IdFilm, fl.ShortPlot } into newTable
                              from f in context.Film
                              where f.FilmId == newTable.IdFilm
                              select new
                              {
                                  newTable.Title,
                                  newTable.IdFilm,
                                  newTable.ShortPlot,
                                  f.Format,
                                  f.Price,
                                  f.Year,
                                  f.IsSalable,
                                  f.Availability,
                                  f.Cult,
                                  f.Bgimage,
                                  f.LinkImg
                              }).ToList();


            }

            //  return film;

            //salvataggio chiamare context.save

        }
        public static List<Film> filmWithBlurayFormat(string connectionString)
        {
            Console.WriteLine("sono dentr");
            List<Film> list = new List<Film>();

            //Creo una variabile context di tipo ArchivioFilmContext che prende l'oggetto ArchivioFilmContext
            //restituito dal metodo GenerateArchiviofilmContext contenuto in ContextHelper.
            //Con la direttiva using genera l'oggetto dentro le parentesi che ha effetto solo all'interno di quello scope. 
            //Al di fuori viene eliminato e quindi la Garbage Collector viene gestita in maniera implicita senza allocare 
            //o deallocare gli oggetti esplicitamente
            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {
                Console.WriteLine("Connessione stabilita");
                list = context.Film.Where(f => f.Format == "BluRay").ToList();




            }

            return list;

            //salvataggio chiamare context.save

        }

        public static void countFilmWithBlurayFormat(string connectionString)
        {
            Console.WriteLine("sono dentr");
            int count;

            //Creo una variabile context di tipo ArchivioFilmContext che prende l'oggetto ArchivioFilmContext
            //restituito dal metodo GenerateArchiviofilmContext contenuto in ContextHelper.
            //Con la direttiva using genera l'oggetto dentro le parentesi che ha effetto solo all'interno di quello scope. 
            //Al di fuori viene eliminato e quindi la Garbage Collector viene gestita in maniera implicita senza allocare 
            //o deallocare gli oggetti esplicitamente
            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {
                Console.WriteLine("Connessione stabilita");
                count = context.Film.Where(f => f.Format == "BluRay").Count();

            }

            Console.WriteLine(count);

            //salvataggio chiamare context.save

        }

        public static void joinquery(string connectionString)
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
                var list = from s in context.Store
                           where s.City == "Roma"
                           join b in context.Buy on s.StoreId equals b.StoreId
                           join z in context.Film on b.FilmId equals z.FilmId
                           select z;


                //o
                /*
                    * var list = from s in context.Store
                        where s.City == "Roma"
                        from b in context.Buy
                        where s.StoreId==b.StoreId
                        from z in context.Film
                        where z.FilmId==b.FilmId
                        select z;
                */

            }



            //salvataggio chiamare context.save

        }

        public static List<Film> getFilmsForKind(string connectionString, int id)
        {
            Console.WriteLine("sono dentr");
            List<Film> list = new List<Film>();
            string kindFromMovie;
            //Creo una variabile context di tipo ArchivioFilmContext che prende l'oggetto ArchivioFilmContext
            //restituito dal metodo GenerateArchiviofilmContext contenuto in ContextHelper.
            //Con la direttiva using genera l'oggetto dentro le parentesi che ha effetto solo all'interno di quello scope. 
            //Al di fuori viene eliminato e quindi la Garbage Collector viene gestita in maniera implicita senza allocare 
            //o deallocare gli oggetti esplicitamente
            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {



            }

            return list;

            //salvataggio chiamare context.save

        }

        public static List<Film> getFilmsForKind2(string connectionString, int id)
        {


            List<Film> list = new List<Film>();
            string kindFromMovie;
            string[] kinds;
            string newKind = "";
            //Creo una variabile context di tipo ArchivioFilmContext che prende l'oggetto ArchivioFilmContext
            //restituito dal metodo GenerateArchiviofilmContext contenuto in ContextHelper.
            //Con la direttiva using genera l'oggetto dentro le parentesi che ha effetto solo all'interno di quello scope. 
            //Al di fuori viene eliminato e quindi la Garbage Collector viene gestita in maniera implicita senza allocare 
            //o deallocare gli oggetti esplicitamente
            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {







            }

            return list;

            //salvataggio chiamare context.save

        }

        public static void updateAvailability(string connectionString, Guid id, string language, int availability )
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

                foreach(Film f in context.Film)
                {

                    if (f.FilmId == id)
                    {
                        f.Availability = (short)availability;
                        if (f.Availability == 0)
                            f.IsSalable = false;
                    }

                }
                context.SaveChanges();
            }

        }


        public static void insertMovie(string connectionString, Guid id, string language, Film movie)
        {
            Console.WriteLine("sono dentr");

            //Creo una variabile context di tipo ArchivioFilmContext che prende l'oggetto ArchivioFilmContext
            //restituito dal metodo GenerateArchiviofilmContext contenuto in ContextHelper.
            //Con la direttiva using genera l'oggetto dentro le parentesi che ha effetto solo all'interno di quello scope. 
            //Al di fuori viene eliminato e quindi la Garbage Collector viene gestita in maniera implicita senza allocare 
            //o deallocare gli oggetti esplicitamente
            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {


                Convert.ToBoolean(movie.Cult);
               
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
                context.Film.Add(movie);
                
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

                Film film = (from f in context.Film
                                where f.FilmId == id
                                select f).FirstOrDefault();


                context.Film.Remove(film);

                context.SaveChanges();
            }

        }

        public static void updateMovie(string connectionString, Film film)
        {

            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {


                foreach (Film f in context.Film)
                {
                    if (f.FilmId == film.FilmId)
                    {
                        if(f.Format != film.Format)
                            f.Format = film.Format;
                        if (f.Availability != film.Availability)
                        {
                            f.Availability = film.Availability;
                            f.IsSalable = f.Availability ==0 ? false : true;
                        }
                        if (f.Bgimage != film.Bgimage)
                            f.Bgimage = film.Bgimage;
                        if (f.Cult != film.Cult)
                            f.Cult = film.Cult;
                        
                        if (f.LinkImg != film.LinkImg)
                            f.LinkImg = film.LinkImg;
                        if (f.Price != film.Price)
                            f.Price = film.Price;
                        if (f.Year != film.Year)
                            f.Year = film.Year;
                       
                    }
                }


                context.SaveChanges();
            }

        }


    }
}
