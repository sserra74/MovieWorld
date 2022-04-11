import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { LanguageService } from '../../service/language.service';
import { ChangeDetectorRef } from '@angular/core';

import SwiperCore, {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
} from "swiper";


// install Swiper modules
SwiperCore.use([Navigation, Pagination, Mousewheel, Keyboard]);

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',

  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {

  @Output() movieClickedEvent = new EventEmitter();

  //array dei film ottenuti tramite get
  movies: any = [];
  //array dei film cult
  cultMovies: any=[];
  //array delle news ottenute tramite get
  news: any = [];
  //array dei film per slide
  partialMovies: any;
  //lingua scelta dall'utente o di default
  language: string = "";
  
  constructor(private httpClient: HttpClient,
    private router: Router,
    private languageService: LanguageService) {
    //Ottengo la lingua di default
    this.defaultLanguage();

    //Ogni volta che la lingua cambia chiamo ilservizio aggiornando la lingua e ricaricando le news in base alla lingua scelta 
    this.languageService.languageChanged.subscribe(l => {
      this.language = l;
      this.loadNews()
    });
  }

  ngOnInit(): void {

    //Carico i film
    this.loadMovies();
    //Carico le news
    this.loadNews();
  }

 /* moviesLength(): number {
    return this.movies.length;
  }*/

  //Metodo per controllare se il sito è aperto da smartphone o no
  smartphoneView(): boolean {
    if (window.innerWidth > 539)
      return false;
    else
      return true;
  }

  movieChosed(index: number): void {
    console.log("index: " + index);
    this.router.navigateByUrl(this.language + '/movieDetail/' + index);

  }

  newsClicked(id: string)
  {
    console.log("id", id);
    this.router.navigateByUrl(this.language + '/news/' + id);
  }


  emit(value: any) {
    this.movieClickedEvent.emit(value);
  }


  loadMovies(): void {
    //Faccio una richiesta get passando la stringa di connessione, il controller, l'azione (metodo) e la lingua
    this.httpClient.get(environment.webSiteUrl + "/Films/GetFilmList/0/" + this.language).subscribe(data => {
      this.movies = data;
      this.cultMovies=this.movies.filter((item:any) => item.cult==true);
      console.log(this.cultMovies);
    });
  }

  loadNews(): void {
    //Faccio una richiesta get passando la stringa di connessione, il controller, l'azione (metodo) e la lingua
    this.httpClient.get(environment.webSiteUrl + "/News/GetNewsList/" + this.language).subscribe(data => {
      this.news = data;
      console.log("news: ",this.news);
    });
  }

  defaultLanguage() {

    this.language = window.navigator.language;

    if (this.language.includes("it"))
      this.language = "it";
    else
      this.language = "en";
    //Richiamo il servizio settando la lingua
    this.languageService.setLanguage(this.language);
  }

  //Metodo per capire quante slide generare in base ai film presenti nel catalogo
  countSlide(length: number, smartphone: boolean): number {

    if (smartphone == false) //se il sito non è aperto da smartphone 
    {
      if (length % 2 == 0)
        return length / 4;
      else 
      {
        let count: number = 0;
        while (length > 4) 
        {
          length = length - 4;
          count++
        }
        return count + 1;
      }
    }
    else
      return this.cultMovies.length;
  }

  //Metodo per restituire i film per ogni slide (4 a slide)
  getMoviesForSlide(slideNumber: number, movies: any): any {

    let temp: number;
    temp = slideNumber + 1;

    this.partialMovies = [...this.movies];

    return this.partialMovies.slice(slideNumber * 4, temp * 4);
  }

}
