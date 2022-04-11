using Microsoft.EntityFrameworkCore;
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
    public class FilmGenreBLL
    {

        public static List<Genre> getFilmGenre(string connectionString, Guid id, string language)
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
                var list = from filmGenre in context.FilmGenre
                        where filmGenre.IdFilm == id
                        from g in context.Genre
                        where filmGenre.IdGenre == g.IdGenre
                        from m in context.Multilingual
                        where m.Id == g.IdMultilingual && m.Language == language
                        
                        select g;

                return (from l in list
                       orderby l.Genre1 ascending
                       select l).ToList();


            }

        }


        public static IEnumerable<dynamic> adviceFilm(string connectionString, Guid id )
        {
            Console.WriteLine("sono dentr");
            List<String> genresOfFilmClicked = new List<String>();
          
            //Creo una variabile context di tipo ArchivioFilmContext che prende l'oggetto ArchivioFilmContext
            //restituito dal metodo GenerateArchiviofilmContext contenuto in ContextHelper.
            //Con la direttiva using genera l'oggetto dentro le parentesi che ha effetto solo all'interno di quello scope. 
            //Al di fuori viene eliminato e quindi la Garbage Collector viene gestita in maniera implicita senza allocare 
            //o deallocare gli oggetti esplicitamente
            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {

                string nameFilmSelected = (from fl in context.FilmLabel
                                    where fl.IdFilm == id
                                    select fl.Title).FirstOrDefault();

                genresOfFilmClicked = (from filmGenre in context.FilmGenre
                                       where filmGenre.IdFilm == id
                                       from g in context.Genre
                                       where filmGenre.IdGenre == g.IdGenre
                                       select g.Genre1).ToList();

                //Ottengo la lista dei film con i loro generi facendo i join e selezionando i campi da visualizzare
                var listOfFilmWithGenre = (from fg in context.FilmGenre
                                           from f in context.Film
                                           where fg.IdFilm == f.FilmId
                                           select new { f.FilmId, f.LinkImg, GenreID = fg.IdGenre } into newTable
                                           from g in context.Genre
                                           where newTable.GenreID == g.IdGenre
                                           select new { newTable.FilmId, newTable.LinkImg, g.Genre1 } into midTable
                                           from fl in context.FilmLabel
                                           where fl.IdFilm == midTable.FilmId 
                                           select new { fl.Title, midTable.FilmId, midTable.LinkImg, midTable.Genre1 }).ToList();


                /*Prendo la lista dei film con il genere e la raggruppo per il titolo, in modo da avere per ogni
                 * titolo più valori. Di questa tabella metto come key, il titolo (g.Key corrisponde a ciò che si è 
                 * messo nel group by, quindi w.Title) e come valori i generi il cui campo è sarà chiamto in questa
                 * nuova tabella RecordIDs.
                 * Vado poi a prendere la tabella g, in particolare prendo i suoi record c e controllo se la lista dei
                 * generi del film cliccato dall'utente contiene almeno uno dei generi presenti nella tabella
                 * */
                var adviceFilms = listOfFilmWithGenre
                    .GroupBy(w => w.Title)
                    .Select(g => new
                    {
                        keyword = g.Key,
                        RecordIDs = g.Select(c => c.Genre1),
                        img = g.Select(c => c.LinkImg).Distinct(),
                        Count = g.Count(c => genresOfFilmClicked.Any(x => c.Genre1.Contains(x)))
                    })
                    .OrderByDescending(f => f.Count);

                return adviceFilms.Where(f => f.keyword!=nameFilmSelected && f.Count>0).Take(5).ToList();

                /*
                 *  var adviceFilms = listOfFilmWithGenre
                    .GroupBy(w => w.Title)
                    .Select(g => new
                    {
                        keyword = g.Key,
                        RecordIDs = g.Select(c => c.Genre1),
                        img = g.Select(c => {
                            if (c.LinkImg == null)
                            {
                                c.LinkImg = ImageNotAvaiable.ImageNotFound(c.LinkImg);
                                return c;
                            }
                            else
                                c.LinkImg;
                                }).Distinct(),
                        Count = g.Count(c => genresOfFilmClicked.Any(x => c.Genre1.Contains(x)))
                    })
                    .OrderByDescending(f => f.Count)
                    .Take(5);
                 */
               // return adviceFilms;
            }

        }

        public static IEnumerable<dynamic> getFilmByGenre(string connectionString)
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
                return  (from m in context.Multilingual
                        from fl in context.FilmLabel
                        where m.Id == fl.IdMultilingual && m.Language == "it"

                        from f in context.Film

                        where f.FilmId == fl.IdFilm

                        from filmGenre in context.FilmGenre
                        from g in context.Genre
                        where  filmGenre.IdGenre == g.IdGenre && filmGenre.IdFilm == f.FilmId && g.IdMultilingual == m.Id
                                
                        select new { fl.Title, f.LinkImg, f.Price, f.IsSalable, f.Format, f.Year, g.Genre1 }).ToList();


               /* return (film
                     .GroupBy(w => w.Genre1)
                     .Select(g => new
                     {
                         keyword = g.Key,
                         RecordIDs = g.Select(c => c.Title),
                         img = g.Select(c => c.LinkImg).Distinct(),
                         Price = g.Select(c => c.Price),
                         IsSalable = g.Select(c => c.IsSalable).Distinct(),
                     })).ToList();*/
                    

            }

        }

    }
}

