import { Component, EventEmitter, HostListener, OnInit, Output  } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { faUser} from '@fortawesome/free-solid-svg-icons';
import {ChangeDetectorRef} from '@angular/core';
import { LanguageComponent } from '../language/language.component';
import { LanguageService } from '../../service/language.service';

import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';
import { Label } from '../models/label.model';
import {MenuItem} from 'primeng/api';
import { CookieService } from 'ngx-cookie-service';
import { MovieInCartService } from 'src/service/movieInCart.service';
//import * as imgLanguageIt from "src/assets/Images/itaLanguage.png";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  menu: boolean = false;
  public getScreenWidth: any;
  public getScreenHeight: any;
  faUser=faUser;
  hover: boolean = false;
  public languageC:string = "";
  labels: Label[] = new Array(); 
  language: string = "";
  currentRoute: string="";
  per: string="";
  quantity: number=0;
  gfg: boolean=false;
  items: MenuItem[]=[];
  @Output() changeLanguageEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private cdr:ChangeDetectorRef, 
    private httpClient: HttpClient, 
    private languageService: LanguageService,
    private router: Router,
    private movieInCartService: MovieInCartService,
    private cookieService: CookieService)
  {
   
    this.languageService.languageChanged.subscribe(l =>{this.language=l});
    this.movieInCartService.quanityUpdate.subscribe(q => this.quantity=q)
        //Se nei cookie ho già dei film nel carrello
    if(this.cookieService.check("quantity"))
    {
      this.quantity=Number(this.cookieService.get("quantity"));
      console.log("dentro if");
    }
    else //altrimenti
    {
      this.quantity=0;
      console.log("dentro else");
    }

      
    console.log("q in header: ",this.quantity);
    
     // 
    //  this.languageService.setLanguage(this.language);
    console.log("lingua in header",this.language);
  }
  ngOnInit()
  {
   
  this.defaultLanguage();
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    this.Menu();
    
  }

  Menu()
  {
    this.items = [{
      label: 'Lingua',
      items: [
          {label: 'It', icon: 'imgLanguageIt'},
          {label: 'En', icon: 'pi pi-fw pi-download'}
      ]
  },
  {
    label: 'Link utili',
    items: [
          {label: 'Homepage', icon: 'pi pi-fw pi-home', routerLink: this.language+'/' },
          {label: 'Catalogo', icon: 'pi pi-fw pi-file', routerLink: this.language+'/catalogue'},
          {label: 'Punti Vendita', icon: 'pi pi-fw pi-map-marker', routerLink: this.language+'/deliveryPoint'}
    ]
  }];
   
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  smartphoneView(): boolean
  {// console.log("screen: ",this.getScreenWidth); 
  
    if( window.innerWidth>539)
      return false;
    else
      return true;
  }

  showMenu(): void
  {
   console.log("menu");
   this.menu=!this.menu;
   //this.gfg=true;
  
     
  }

  setHover()
  {
    this.hover=!this.hover;
  }

  languageClicked($event:any)
  {
 
    this.languageService.setLanguage($event);
    console.log("l e'", this.language);
   // this.languageC=this.languageService.getLanguage();
    this.httpClient.get<Label>(environment.webSiteUrl+"/Label/GetLabelByLanguageHeader/"+this.language).subscribe((data: any) =>{ 
      this.labels=data;
    });
   
  //  this.changeLanguageEvent.emit(true);
    //this.cdr.detectChanges();
    
  }
  defaultLanguage()
  {
   
   this.language=navigator.language;
    if(this.language.includes("it"))
      this.language="it";
    else
      this.language="en";

   //   this.languageService.setLanguage(this.language);
  }
 
  TakeCurrentRoute()
  {
    this.cookieService.set("pathPrec",this.router.url);
   // this.pathService.setPath(this.router.url);

  }

  setPath()
  {
     
  }

}
