using MovieWorld.EF;
using MovieWorld.EF.Context;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MovieWorld.BLL
{  
    public class LabelsBLL
    {
        public static IEnumerable<dynamic> getLabelByLanguageHeader(string connectionString, String language)
        {

            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {
                Console.WriteLine("Connessione stabilita");
                return (from l in context.Label
                        from m in context.Multilingual
                        where l.IdMultilingual == m.Id && m.Language==language
                        && l.Key.Contains("Header")
                        select new {l.Key, l.LabelContent}
                        ).ToList();


            }

        }

        public static IEnumerable<dynamic> getLabelByLanguageDetailPage(string connectionString, String language)
        {

            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {
                Console.WriteLine("Connessione stabilita");
                return (from l in context.Label
                        from m in context.Multilingual
                        where l.IdMultilingual == m.Id && m.Language == language
                        && l.Key.Contains("Detail")
                        select new {l.Key,l.LabelContent }
                        ).ToList();


            }

        }

        public static IEnumerable<dynamic> getLabelByLanguageCatalogPage(string connectionString, String language)
        {

            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {
                Console.WriteLine("Connessione stabilita");
                return (from l in context.Label
                        from m in context.Multilingual
                        where l.IdMultilingual == m.Id && m.Language == language
                        && l.Key.Contains("Catalog")
                        select new { l.Key, l.LabelContent }
                        ).ToList();
            }
        }

        public static IEnumerable<dynamic> getLabelByLanguageDeliveryPointPage(string connectionString, String language)
        {

            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {
                Console.WriteLine("Connessione stabilita");
                return (from l in context.Label
                        from m in context.Multilingual
                        where l.IdMultilingual == m.Id && m.Language == language
                        && l.Key.Contains("DeliveryPoint")
                        select new { l.Key, l.LabelContent }
                        ).ToList();


            }

        }

        public static IEnumerable<dynamic> getLabelByLanguageCartPage(string connectionString, String language)
        {

            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {
                Console.WriteLine("Connessione stabilita");
                return (from l in context.Label
                        from m in context.Multilingual
                        where l.IdMultilingual == m.Id && m.Language == language
                        && l.Key.Contains("Cart")
                        select new { l.Key, l.LabelContent }
                        ).ToList();


            }

        }

        public static IEnumerable<dynamic> getLabelByLanguageBOPage(string connectionString, String language)
        {

            using (ArchiviofilmContext context = ContextHelper.GenerateArchiviofilmContext(connectionString))
            {
                Console.WriteLine("Connessione stabilita");
                return (from l in context.Label
                        from m in context.Multilingual
                        where l.IdMultilingual == m.Id && m.Language == language
                        && l.Key.Contains("BO")
                        select new { l.Key, l.LabelContent }
                        ).ToList();


            }

        }
    }
}

