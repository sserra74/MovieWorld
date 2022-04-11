import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { LanguageService } from '../service/language.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  languageLabel: any=[];
  labels: any=[];
  selectedLanguageLabels:  string[]=[];
  language: string="";
  @Input() username:string="";

  constructor(private httpClient: HttpClient, private languageService: LanguageService ) { 

    this.languageLabel = [
      {name: 'it'},
      {name: 'en'},
      
  ];


  this.languageService.languageClicked.subscribe( l =>
    {
          this.language=l;
          console.log("llll: ",this.language)
          this.getLabels();
          
    })
  }

  ngOnInit(): void {
    let l =navigator.language.includes("it") ? "it" : "en";
    this.getLabels();
  }

  getLabels()
  {
    this.httpClient.get(environment.webSiteUrl+"/Label/GetLabelByLanguageBOPage/"+this.language).subscribe(
      data =>{this.labels=data; console.log("ok label in header")}
    );
  }

  setLanguage()
  {
    let l:string;
    if(this.selectedLanguageLabels.length>0)
    {
      this.selectedLanguageLabels.forEach((element: any) => {
        l=element.name;
        this.languageService.setLanguage(l);
     
        console.log("name: ",element.name);
      });
    }
  }

}
