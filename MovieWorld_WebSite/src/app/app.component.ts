import { Component, HostListener  } from '@angular/core';
import { LanguageService } from '../service/language.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MovieWorld';
  public getScreenWidth: any;
  public getScreenHeight: any;
  movieClicked: any;

  h: boolean=false;
  language: string = "it";

  constructor(public languageService: LanguageService)
  {
    this.languageService.languageChanged.subscribe(l =>{
      this.language=l});

     
  }
  ngOnInit(menu: boolean)
  {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
   
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
  }

  smartphoneView(): boolean
  {
    if( this.getScreenWidth>500)
      return false;
    else
      return true;
  }

  showMenu(): void
  {
    console.log("clicco");
     this.ngOnInit( !this.showMenu);
     
  }

  takeMovie(value: any)
  {
    this.movieClicked=value;
  }

  
}
