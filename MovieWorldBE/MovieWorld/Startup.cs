using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using MovieWorld.BLL;
using MovieWorld.EF.Context;
using MovieWorld.NET5.Controllers;
using System;
using NSwag;
using NSwag.AspNetCore;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace MovieWorld
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            //Configurazione DbContext
            services.AddDbContext<ArchiviofilmContext>();
            services.AddSingleton<IConfiguration>(Configuration);
            services.AddControllersWithViews();

            services.AddSwagger();

            //Utilizzato per l'upload dei file, in particolare per evitare il MultipartBodyLengthLimit (dimensione file)
            services.Configure<FormOptions>(o => {
                o.ValueLengthLimit = int.MaxValue;
                o.MultipartBodyLengthLimit = int.MaxValue;
                o.MemoryBufferThreshold = int.MaxValue;
            });

            services.AddOpenApiDocument(x =>
            {
                x.Title = "MovieWorld API";
                x.Description = "questa è una descrizione";
                x.Version = "v1";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            app.UseOpenApi();
            app.UseSwaggerUi3();
            app.UseHttpsRedirection();

           
            app.UseCors(x => x
           .AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader());

            app.UseDefaultFiles();
           app.UseStaticFiles();
            //Definito per rendere utilizzabili le immagini nella cartella Resources/Images
            /*app.UseStaticFiles(new StaticFileOptions()
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(Directory.GetCurrentDirectory(), @"StaticFiles")),
                RequestPath = new PathString("/StaticFiles")
            });*/

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}/{kinds?}");
                
            });


           
           /* FilmGenreBLL.adviceFilm("Data Source=DESKTOP-IQU2FV2\\SQLEXPRESS01;Initial Catalog=ArchivioFilm;Integrated Security=True", new System.Guid("f1360ecc-495a-4cce-b839-8114b02db2ff"));
            //  MovieBLL.getFilmsForKind2("Data Source=DESKTOP-IQU2FV2\\SQLEXPRESS01;Initial Catalog=ArchivioFilm;Integrated Security=True",1);
            Console.WriteLine("-----------------FILM WITH BLURAY FORMAT");
            MovieBLL.filmWithBlurayFormat("Data Source=DESKTOP-IQU2FV2\\SQLEXPRESS01;Initial Catalog=ArchivioFilm;Integrated Security=True");
            Console.WriteLine("-----------------NUMBER OF FILM WITH BLURAY FORMAT");
            MovieBLL.countFilmWithBlurayFormat("Data Source=DESKTOP-IQU2FV2\\SQLEXPRESS01;Initial Catalog=ArchivioFilm;Integrated Security=True");
            Console.WriteLine("-----------------Join");
            MovieBLL.joinquery("Data Source=DESKTOP-IQU2FV2\\SQLEXPRESS01;Initial Catalog=ArchivioFilm;Integrated Security=True");*/
            MovieBLL.updateAvailability("Data Source=DESKTOP-IQU2FV2\\SQLEXPRESS01;Initial Catalog=ArchivioFilm;Integrated Security=True",new Guid("65786d15-4cc0-4a68-89eb-7c04cca8e191"),"it",1);
        }
    }
}
