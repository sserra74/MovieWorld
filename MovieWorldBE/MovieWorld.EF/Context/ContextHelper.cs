using Microsoft.EntityFrameworkCore;
using MovieWorld.EF.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieWorld.EF
{
    public static class ContextHelper
    {

        public static ArchiviofilmContext GenerateArchiviofilmContext(string cnnstr)
        {
            //Se la stringa passata non è valida restituisco 
            if (string.IsNullOrWhiteSpace(cnnstr))
            {
                return new ArchiviofilmContext();
            }
            else
            {
                /**
                 *  DbContextOptionsBuilder<ArchiviofilmContext>() -> inizializza un'istanza del del DB con contesto ArchivioFilmContext
                 *  UseSqlServer -> configura il contesto per connettersi al database SQL
                 *  Option -> configura le opzioni
                 **/
                var options = new DbContextOptionsBuilder<ArchiviofilmContext>().UseSqlServer(cnnstr).Options;

                return new ArchiviofilmContext(options);
            }
        }
    }
}

