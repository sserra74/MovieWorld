import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.css']
})
export class LanguageComponent implements OnInit {
  //Array di lingua presenti nel sito
 languages: any = [];

 @Output() languageClickedEvent: EventEmitter<any> = new EventEmitter<any>()

  constructor( private httpClient: HttpClient) { 
    //Ottengo le lingue
    this.httpClient.get(environment.webSiteUrl+"/Language/GetLanguageList").subscribe((data: any) =>{ 
      this.languages=data;
    })
  }
 
  ngOnInit(): void {}


  changeLanguage(language:string): void
  {
    this.languageClickedEvent.emit(language);
  }
}
