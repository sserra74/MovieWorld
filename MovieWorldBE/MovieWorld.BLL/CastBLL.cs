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
    public class CastBLL
    {

        public static IEnumerable<dynamic> findMovieDirector(string connectionString, Guid id)
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
               return(from r in context.Realize
                             where r.FilmId == id
                             from movieD_actor in context.Cast
                             where r.ActorMovieDirectorId == movieD_actor.ActorsDirectorId
                             select new { movieD_actor} into newTable
                             from role in context.RoleOfCast
                             where role.Id == newTable.movieD_actor.IdRole
                             select new { newTable, role } into finalTable
                             select new
                             {
                                 finalTable.newTable.movieD_actor.Name,
                                 finalTable.newTable.movieD_actor.Surname,
                                 finalTable.newTable.movieD_actor.Img,
                                 finalTable.newTable.movieD_actor.LinkBiography,
                                 finalTable.role.Role
                             }).ToList();

               
            }

           

        }

        public static IEnumerable<dynamic> findMovieActors(string connectionString, Guid id)
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
               return  (from r in context.Realize
                          where r.FilmId == id
                          from movieD_actor in context.Cast
                          where r.ActorMovieDirectorId == movieD_actor.ActorsDirectorId
                          from role in context.RoleOfCast
                          where role.Id == movieD_actor.IdRole && role.Role=="Attore"
                          select new { movieD_actor, role } into finalTable
                          select new
                          {
                            finalTable.movieD_actor.Name,
                            finalTable.movieD_actor.Surname,
                            finalTable.movieD_actor.Img,
                            finalTable.movieD_actor.LinkBiography,
                            finalTable.role.Role
                          }).ToList();


            }



           

        }
    }
}
