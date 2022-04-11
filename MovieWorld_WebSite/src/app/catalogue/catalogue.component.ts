import { HttpClient } from '@angular/common/http';
import { HtmlTagDefinition } from '@angular/compiler';
import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { max } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { PaginationEvents } from 'swiper/types';
import { IndexKind } from 'typescript';
import { LanguageService } from '../../service/language.service';

import { Label } from '../models/label.model';
@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})


export class CatalogueComponent implements OnInit {


  clicked:boolean[]=[false, false, false, false];
  years: number [] = [];
  labelsFilter: string[] = ["Genere", "Anno", "Prezzo", "Formato"];
  labels:any;
  //Lista dei film presenti nei punti vendita
  movies: any = [];
  //Film filtrati allo stato precedente
  moviesFiltered: any = [];
  //Variabile per tenere traccia dell'input precedentemente premuto
  year: number=0;
  myValue:string="";
  //lista degli input html passati
  inputClickedGenre: string[]=[];
  hoverFilterGroup: boolean=true;
  nameOfFilterClicked: string=""; 
  //anno passato
 
  a: Label[] = new Array();
d:number=0;

  moviesCopy: any;
  valuesOrder: string[] = []; 
  moviesByGenre: any;
  page: number=1;
 
  previousPage: number=0;
  lastMovies: any;
  start: number =0;
  end: number =0;
  language: any;
  checkedBoxClicked: number=0;
  price: string="";
  pageSize:number=8;
  stringSearch: string="";
  pages:number=0;
  
  @ViewChildren("GenreInputAction")
  checkboxes!: ElementRef;

  @ViewChildren("InputPrezzoC")
  prezzoC!: ElementRef;
  constructor(private httpClient: HttpClient, 
              private cdr:ChangeDetectorRef, 
              private router: Router,
              public route: ActivatedRoute,
               private languageService: LanguageService) {
                
                
              
    this.language = this.route.snapshot.paramMap.get('language');
             
    this.languageService.languageChanged.subscribe(l =>{
     
      this.language=l;
      console.log("lingua",this.language);
      this.getMovies();
      this.getLabels()
     }); 
      this.start=0;
      this.end=8;
      
  }
 


  ngOnInit(): void {
    this.generateYears();
    this.getMovies();
    
    this.getMoviesByGenre();
    this.getLabels();
    this.d=Math.floor(this.movies.length/8)*10;
  }

  getLabels()
  {
    this.httpClient.get<Label>(environment.webSiteUrl+"/Label/GetLabelByLanguageCatalogPage/"+this.language).subscribe((data: any) =>{ 
    
      this.labels=data
      this.labels=this.labels.filter((item: { key: string | string[]; }) => item.key.includes("Catalog"));
      console.log("labels",this.labels);
    });
  }

  /*Metodo per generare la listad egli anni per il filtro*/ 
  generateYears()
  {
    let count: number=2022;
    let i: number=0;
    while(count>1950)
    {
      this.years.push(count);
      count--;
    }
  }

  /*Metodo per generare la lista dei film per il catalogo*/   
  getMovies(): void
  {
    this.httpClient.get(environment.webSiteUrl+"/Films/GetFilmList/0/"+this.language).subscribe(data =>{
     
      this.movies = data;
      setTimeout(() =>{
        this.pages = this.movies.length;
      },1000);
      this.lastMovies=data;
      this.moviesCopy=[...this.movies];
    
    });
    
  }

  /*Metodo per filtrare i film dal prezzo*/
  filterPrice(input: HTMLInputElement ): void
  {
    
    if(input.name=="price" || this.price=="crescente")  
    {
      if(input.value[0]!='d' || this.price=="crescente")
      {
        this.movies.sort((a: { price: number; },b: { price: number; }) => a.price-b.price);
        this.price="crescente";
      }
      else
      {
        this.movies.sort((a: { price: number; },b: { price: number; }) => b.price-a.price);
        this.price="decrescente";
      }
    }
    
  }

  updateInputList(input: HTMLInputElement)
  {
    if(input.checked)
    {
      this.nameOfFilterClicked=input.name;
      console.log("nf,",this.nameOfFilterClicked);
      //Può capitare che stia switchando da dvd a bluray. In tal caso devo togliere DVD, altrimenti cerca i film sia in formato
      //dvd che in bluray. Viceversa nell'else 
      if(this.inputClickedGenre.includes("DVD") && input.value=="BluRay")
        this.inputClickedGenre.forEach((element,index) => {
          if("DVD"==element) this.inputClickedGenre.splice(index,1);
        });
      else
        if(this.inputClickedGenre.includes("BluRay") && input.value=="DVD")
          this.inputClickedGenre.forEach((element,index) => {
            if("BluRay"==element) this.inputClickedGenre.splice(index,1);
          });
      //Aggiungo il valore selezionato    
      this.inputClickedGenre.push(input.value);
    

      //Copio i film 
      this.movies=[...this.moviesByGenre]; 
      
    }
    else //se sto togliendo la spunta
    {  
      this.nameOfFilterClicked="";
        //tolgo la spunta e quindi il valore dal vettore dei ifltri
        this.inputClickedGenre.forEach((element,index) => {
          if(input.value==element) this.inputClickedGenre.splice(index,1);
        });
        
        if(this.inputClickedGenre.length==0)
          this.ResetFilter();

      
    }
  }
  filter(input:HTMLInputElement): void
  {
    
   
    //Se c'è la spunta
    this.updateInputList(input);
    this.filterBy();
    if(this.price!="")
      this.filterPrice(input);
    
    if(this.year!=0)
    {
      this.movies=this.movies.filter((entry: any) =>  entry.year === this.year);
      if(this.movies.length==0)
        this.year=0;
    }
    this.movies=this.movies.filter((item: { title: any; }, index: any) => this.movies.findIndex((s: { title: any; }) => item.title === s.title) === index)
    this.pages = this.movies.length;
    
    
  }

  filterBy()
  {
    
    let i=0;
    //filtro con tutti i filtri che ho nel vettore
    while(i<this.inputClickedGenre.length)
    {
      //se non è né dvd ne bluray, filtro per genere
      if(this.inputClickedGenre[i]!="DVD" && this.inputClickedGenre[i]!="BluRay")
        this.movies=this.movies.filter((entry: any) =>   this.inputClickedGenre.some(x=>x === entry.genre1));
      else //altrimenti filtro per formato
        this.movies=this.movies.filter((entry: any) =>   this.inputClickedGenre.some(x=>x === entry.format));
      i++;
    }

    

   
  }

  filterYear(value: number): void
  {
  
    // this.movies=[...this.moviesCopy];
   
    this.year=value;
   
    this.movies=[...this.moviesByGenre];
    if(this.inputClickedGenre.length>0)
      this.filterBy();
    else  
      this.movies=this.movies.filter((entry: any) =>  entry.year === value);
  
    if(this.movies.length==0)
      this.year=0;
    this.movies=this.movies.filter((item: { title: any; }, index: any) => this.movies.findIndex((s: { title: any; }) => item.title === s.title) === index)








   
  }

  getLastMovies():any
  {
    
    this.lastMovies=this.lastMovies.filter((entry: any) =>  entry.year === 2022);
    console.log("f: ",this.lastMovies);
    return this.lastMovies;
  }

  filterGenre(input:HTMLInputElement): void
  {
  
    this.movies=[...this.moviesCopy];
    
    //this.movies=this.movies.filter((entry: any) =>  entry.gen === value);
        
  }

  addValueForOrdering(a: HTMLInputElement)
  {}

  nextPage(p: NgbPagination)
  {
   
    if(this.previousPage<p.page)
    {
      this.start=this.end;
      this.end=this.end*2;
    }
    else
    {
      this.start=this.start-8;
      this.end=this.end-8;
    }

    this.previousPage=p.page;
    
  }

  calculatePages():number
  {
   
   
    
     return 9;

     
  }

  getMoviesByGenre():void
  {
    this.httpClient.get(environment.webSiteUrl+"/FilmGenre/GetFilmByGenre").subscribe((data: any) =>{ 

          
      this.moviesByGenre=data;
      
      })
  }
  filterByGenre(input: HTMLInputElement):void
  {

      if(input.checked )
      {
          this.movies=[...this.moviesByGenre];
        this.checkedBoxClicked++;
        if(!this.valuesOrder.includes(input.value))
          this.valuesOrder.push(input.value);
    
        this.movies=this.movies.filter((item: any) => (this.valuesOrder.includes(item.genre1)));
        let title = this.movies.map((t: any) => t.title);
     
        this.movies=this.movies.filter((item: { title: any; }, index: any) => this.movies.findIndex((s: { title: any; }) => item.title === s.title) === index)
      }
      else
      {
        this.nameOfFilterClicked="";
        this.checkedBoxClicked--;
        
        if(this.checkedBoxClicked==0)
        {
          this.movies=[...this.moviesCopy];
          this.valuesOrder.splice(0, this.valuesOrder.length);
          alert("tutti");
        }
        else
        {
          if(this.valuesOrder.length>1)
            this.valuesOrder.forEach((element: string, index: number) => {
              if(input.value==element)
                this.valuesOrder.splice(index,1);
            });
          else
            this.valuesOrder.pop();
        
          this.movies=this.movies.filter((item: any) => (this.valuesOrder.includes(item.genre1)));
        }
        
      }

   
      
  }

  ResetFilter():void
  {
      this.nameOfFilterClicked="";
      this.movies=[...this.moviesByGenre];

      this.movies=this.movies.filter((item: { title: any; }, index: any) => this.movies.findIndex((s: { title: any; }) => item.title === s.title) === index)
    
    }

  getMoviesForPages()
  {

    return this.movies.slice(this.start,this.end)
  }

  movieChosed(salable: boolean, index: any): void
  {
   
    if(salable==true)
      this.router.navigateByUrl(this.language+'/movieDetail/'+index);
    
  }

    smartphoneView(): boolean
    {
   
      if(window.innerWidth>539)
        return false;
      else
        return true;
    }

    searchByName(input: string)
    {
      
      console.log("string",this.stringSearch);
      if(input=="")
      {
        this.stringSearch="";
        this.movies=[...this.moviesByGenre];
        this.movies=this.movies.filter((item: { title: any; }, index: any) => this.movies.findIndex((s: { title: any; }) => item.title === s.title) === index)
      }
      else
      this.movies=this.movies.filter((item: { title: string[]; }) => item.title.toString().toLowerCase().startsWith(input.toLowerCase()));
    }

    setHoverGroup():void
    {
     
      this.hoverFilterGroup=!this.hoverFilterGroup;
    }

    getMoviesLengthAfterFilter(filter: string): number
    {
      console.log(filter);
      let m= [...this.movies];
      if(filter.includes("genre"))
        m=m.filter(item => item.genre1==filter);
      else
        if(filter=="DVD" || filter=="BluRay")
            m=m.filter(item => item.format==filter);
      return m.length;
    }

    filterClicked(filter:string)
    {

    }

    
}//  this.movies=this.movies.filter((item: { title: string[]; }) => item.title.toString().toLowerCase().includes(input.toLowerCase()));
