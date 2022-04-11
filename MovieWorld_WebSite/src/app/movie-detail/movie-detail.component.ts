import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from "@angular/common/http";
import {ChangeDetectorRef} from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { LanguageService } from '../../service/language.service';
import { Label } from '../models/label.model';
import { CookieService } from 'ngx-cookie-service';

import { Order } from '../models/order.model';
import { MovieInCartService } from 'src/service/movieInCart.service';
import { isTemplateExpression } from 'typescript';


interface City {
  city: string,
  road: string[]
}


@Component({
  selector: 'app-movie-chosed',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})


export class MovieDetailComponent implements OnInit {
 
  //Movie cliccato
  public movieClicked: any;
  //Id del film cliccato
  id: any;
  //Genri del film cliccato
  kind: any = [];
  //Lista dei film per cercare poi i film più simili in base al genere
  movies: any = [];
  movies2: any = [];
  //Array di etichette
  labels: Label[] = new Array();
  //Array dei registi del film cliccato
  public movieDirectors: any = [];
  //Array degli attori del film cliccato
  public movieActors: any = [];

  //utilizzati per poter gestire il clic sulle varie schede di Registi, Attori e Film consigliati
  public isCollapsedMovieDirector = false;
  public isCollapsedActors = false;
  public isCollapsedOneMovies = false;

  //buttonClicked: string = "Actors";

  //Record dei Regista, Attore, Film Consigliati del film cliccato
  buttonTitle: any = [];
  //lingua
  language: any;
  //copylanguage: any;

  quantity:number=0;

  cities: City[]=[];

  selectedCities: City[]=[];
 
  constructor(public route: ActivatedRoute, 
              private httpClient: HttpClient, 
              private languageService: LanguageService, 
              private cdr:ChangeDetectorRef,
              public cookieService: CookieService,
              private router: Router,
              private movieInCartService: MovieInCartService
              ) { 
     //ottengo l'id del film cliccato dalla route            
     this.id = this.route.snapshot.paramMap.get('id');
     //ottengo la lingua dalla route 
     this.language = this.route.snapshot.paramMap.get('language');
     //this.defaultLanguage();

     this.languageService.languageChanged.subscribe(l =>{
     // this.copylanguage=this.language;
      this.language=l;
      //Quando aggiorno la lingua riottengo tutti i dati tradotti nella lingua scelta dall'utente
      this.defaultData();
      //this.getButtonTitle();
      this.getLabel();
     }); 
  }

  ngOnInit(): void {

    //Carico tutti i dati della pagina
    this.defaultData();
    //Ottengo le etichette 
    this.getLabel();
 
  }

  
  //Metodo per ottenere le etichette della pagina
  getLabel()
  {
    this.httpClient.get<Label>(environment.webSiteUrl+"/Label/GetLabelByLanguageDetailPage/"+this.language).subscribe((data: any) =>{ 
      this.labels=data;
      //etichette
      this.labels=this.labels.filter(item => item.key.includes("Info"));
      //nomi dei bottoni (regista, attori e film consigliati)
      this.buttonTitle=data.filter((item: { key: string | string[]; }) => item.key.includes("Button"));
      this.buttonTitle.reverse();
    });
  }

  //Metodo per ottenere i registi del film cliccato
  getMovieDirectors(): void
  {
    this.httpClient.get(environment.webSiteUrl+"/Cast/GetMovieDirector/"+(this.movieClicked[0].idFilm.toString())).subscribe((data: any) =>{ 
      this.movieDirectors=data;
    })
  }

  //Metodo per ottenere gli attori del film cliccato
  getMovieActors(): void
  {
    this.httpClient.get(environment.webSiteUrl+"/Cast/GetMovieActors/"+(this.movieClicked[0].idFilm.toString())).subscribe((data: any) =>{   
      this.movieActors=data;
    })
  }

  //Metodo per ottenere i generi del film cliccato
  getMultipleKind(): void
  {
    this.httpClient.get(environment.webSiteUrl+"/FilmGenre/GetFilmGenre/"+(this.movieClicked[0].idFilm.toString())+"/"+this.language).subscribe((data: any) =>{  
        this.kind=data;
    })
  }

  //Metodo utilizzato per assegnare un colore al badge in base al genere
  getBadgeColor(color: String): String
  {
    switch(color)
    {
      case "Cyan": return "badge badge-primary" ; break;
      case "Green": return "badge badge-success" ; break;
      case "Yellow": return "badge badge-warning" ; break;
      case "Black": return "badge badge-dark"; break;
      case "Orange": return "badge badge-danger"; break;
    }
    return "";
  }


 /* getButtonTitle(): void
  {
    this.httpClient.get(environment.webSiteUrl+"/Label/GetLabelByLanguageDetailPage/"+this.language).subscribe((data: any) =>{   
      this.buttonTitle=data.reverse();
      this.buttonTitle=this.buttonTitle.filter((val: { key: string | string[]; }) => val.key.includes("Button"));
      }) 
    
  }*/

 

 /*setButtonClicked(name: string)
 {
   this.buttonClicked=name;
 }*/

 //Metodo utilizzato per ottenere i 5 film consigliati in base al genere
 adviseMovies(): void
 {
    this.httpClient.get(environment.webSiteUrl+"/FilmGenre/GetAdviceFilm/"+this.movieClicked[0].idFilm).subscribe((data: any) =>{       
     this.movies=data;
    })
 }

 /*defaultLanguage()
  {
    
   console.log("llll:",this.language);
    if(this.language=="it")
    {
     
      this.buttonTitle[0]="Regista";
      this.buttonTitle[1]="Cast principale";
      this.buttonTitle[2]="Film che potrebbero piacerti";
    }
    else
    {
      this.language="en";
      this.buttonTitle[0]="Movie Director";
      this.buttonTitle[1]="Main cast";
      this.buttonTitle[2]="Movie might be like";
    }
  }*/
  //Metodo per ottenere i dati richiesti dalla pagina in base al film cliccato e alla lingua
  defaultData():void
  {
    //In base alla lingua scelta e al film cliccato ottengo i dati dal film, i generi, il regista, gli attori e film consiglaiti
    this.httpClient.get(environment.webSiteUrl+"/Films/GetFilm/"+(this.id)+"/"+this.language).subscribe((data: any) =>{ 
    
      this.movieClicked=data;  
      console.log(this.movieClicked);
      this.getMultipleKind();
      this.getMovieDirectors();     
      this.getMovieActors();
      this.adviseMovies();

    })
  }

  AddToCart(movieClicked:any)
  {
    
    
    if((movieClicked[0].availability-1)>=0)
    {
      

     // let order: Order= new Order(movieClicked[0].idFilm, JSON.parse(this.cookieService.get("user")).userId);
     // movieClicked[0].availability--;
     /* this.httpClient.post<Order>(environment.webSiteUrl + "/Order/AddNewOrder",order ).subscribe(data => {
      
       
      });*/
     
      if(this.cookieService.check(movieClicked[0].title))
      {
        let quantity=Number(this.cookieService.get("movie"+movieClicked[0].title));
        quantity++;
        this.cookieService.set("movie"+movieClicked[0].title,quantity.toString());
       
      }
      else
      {
        this.cookieService.set(movieClicked[0].title,JSON.stringify(movieClicked));
        this.cookieService.set("movie"+movieClicked[0].title,"1" );
      }

      this.cookieService.set("quantity",(Number(this.cookieService.get("quantity"))+1).toString());
      this.movieInCartService.setQuantity(Number(this.cookieService.get("quantity")));
     
     setTimeout(()=>{
      this.router.navigate(['it/cart']);
     },1000)
      
      
    }
  }
}