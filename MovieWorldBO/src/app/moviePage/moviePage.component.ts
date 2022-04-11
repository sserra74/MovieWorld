import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
import { ConfirmationService, MessageService } from 'primeng/api';

import { environment } from 'src/environments/environment.prod';
import { LanguageService } from '../service/language.service';
import { Movie } from './movie';

@Component({
  selector: 'app-page',
  templateUrl: './moviePage.component.html',
  styleUrls: ['./moviePage.component.css']
})
export class MoviePageComponent implements OnInit {
  movies: any = [];
  selectedMovies: Movie[] = [];
  submitted: boolean = false;
  movieDialog: boolean = false;
  movie: Movie = {};
  labels: any = [];
  status: string[] = ['OUTOFSTOCK', 'INSTOCK', 'LOWSTOCK'];
  language: string = "";
  constructor(private httpClient: HttpClient,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private cd: ChangeDetectorRef, public languageService: LanguageService) {
    this.languageService.languageClicked.subscribe(l => {
      this.language = l;
      console.log("lingua: ", this.language);
      this.getLabels();
      this.getMovies();
    })



  }

  ngOnInit(): void {
    this.language = navigator.language;
    this.language = this.language.includes("it") ? "it" : "en";
    this.getMovies();
  }

  openNew() {
    this.movie = {};
    this.submitted = false;
    this.movieDialog = true;
  }

  setStatusStock() {

  }

  getLabels() {
    this.httpClient.get(environment.webSiteUrl + "/Label/GetLabelByLanguageBOPage/" + this.language).subscribe(data => { this.labels = data })
  }

  getMovies() {
    this.httpClient.get(environment.webSiteUrl + "/Films/GetFilmList/0/" + this.language).subscribe(data => {
      this.movies = data;
      console.table(this.movies);
    });
  }

  editProduct(movie: Movie) {
    this.movie = { ...movie };
    this.movieDialog = true;
  }

  deleteProduct(movie: Movie) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + movie.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.movies = this.movies.filter((val: { id: any; }) => val.id !== movie.filmId);
        this.httpClient.delete(environment.webSiteUrl + "/FilmLabel/DeleteMovie/" + movie.filmId + "/it").subscribe(data => { console.log("d"); });
        this.httpClient.delete(environment.webSiteUrl + "/Films/DeleteMovie/" + movie.filmId + "/it").subscribe(data => { console.log("d1"); this.movie = {}; });


        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
        this.cd.detectChanges();
      }
    });
  }


  saveProduct() {
    this.submitted = true;
    let movieInTable: Movie = {};
    if (this.movie.title) {
      console.log("id: ", this.movie.filmId);
      if (this.movie.filmId) {
        this.movies[this.findIndexById(this.movie.filmId)] = this.movie;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        this.InsertInTableFilm("PUT");
        this.InsertTableFilmLable("PUT");
      }
      else {
        this.movie.filmId = this.createId();
        this.movie.linkImg = 'product-placeholder.svg';
        this.movies.push(this.movie);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        this.InsertInTableFilm("POST");
        this.InsertTableFilmLable("POST");
        console.log(movieInTable);

      }

      this.movies = [...this.movies];
      this.movieDialog = false;
      this.movie = {};
    }
  }

  InsertInTableFilm(mode: string) {
    let movieToInsert: Movie = {};
    movieToInsert.filmId = this.movie.filmId;
    movieToInsert.availability = this.movie.availability;
    movieToInsert.cult = Boolean(this.movie.cult);
    movieToInsert.price = this.movie.price;
    movieToInsert.format = this.movie.format;
    movieToInsert.isSalable = true;
    movieToInsert.linkImg = this.movie.linkImg;
    movieToInsert.year = this.movie.year;
    movieToInsert.bgImage = this.movie.bgImage;

    if (mode == "POST") {
      this.httpClient.post(environment.webSiteUrl + "/Films/InsertMovie/" + this.movie.filmId + "/it", movieToInsert).subscribe(data => {

        console.table("aggiunto movie");
      });
    }
    else {
      this.httpClient.put<Movie>(environment.webSiteUrl + "/Films/UpdateMovie/", movieToInsert).subscribe(data => { console.log("e"); });
    }
  }

  InsertTableFilmLable(mode: string) {

    if (mode == "POST") {
      this.httpClient.post(environment.webSiteUrl + "/FilmLabel/InsertMovie/" + this.movie.filmId + "/it", { title: this.movie.title, shortPlot: this.movie.shortPlot }).subscribe(data => {
        console.table("aggiunto movie");
      });
    }
    else {
      let movieToInsert: any = {};
      movieToInsert.filmId = this.movie.filmId;
      movieToInsert.title = this.movie.title;
      movieToInsert.shortPlot = this.movie.shortPlot;
      this.httpClient.put<any>(environment.webSiteUrl + "/FilmLabel/UpdateMovie/" + this.movie.filmId, { title: this.movie.title, shortPlot: this.movie.shortPlot }).subscribe(data => { console.log("e"); });
    }
  }
  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.movies.length && index == -1; i++) {
      if (this.movies[i].filmId === id) {
        index = i;

      }
    }
    return index;
  }


  createId(): string {

    return Guid.create().toString();
  }


  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.movies = this.movies.filter((val: Movie) => !this.selectedMovies.includes(val));
        this.selectedMovies = this.selectedMovies.filter((val: Movie) => !this.selectedMovies.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }
  hideDialog() {
    this.movieDialog = false;
    this.submitted = false;
  }

 /* onselectFile(e: any) {

    let url: any;
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload=((event: any) => {
        url=event.target.result;
        console.log("url: ",url);
      })
    }



  }*/

  onSelectedFile = (files: any, movie: any) =>
  {console.log("file: ");
      if(files.length===0)
        return;

        
      let fileToUpload = <File>files[0];
      const formData = new FormData();
      formData.append('file',fileToUpload, fileToUpload.name);

      this.httpClient.post(environment.webSiteUrl + "/Films/uploadImage/", formData, {reportProgress: true, observe: 'events'}).subscribe(data => { console.log("upload")});
  }

}
