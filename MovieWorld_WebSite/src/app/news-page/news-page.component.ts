import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { News } from '../models/news.model';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {

  id: any;
  //news: News;
  news:any;
  language:any;
  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {
   
    this.id=this.route.snapshot.paramMap.get("id");
    this.language=this.route.snapshot.paramMap.get("language");
   }

  ngOnInit(): void {
    this.httpClient.get(environment.webSiteUrl + "/News/GetOnlyOneNews/"+this.id+"/"+this.language).subscribe(data => 
      {
        this.news=data;
      
        console.log(this.news[0].image);
      })

  }

  smartphoneView(): boolean {
    if (window.innerWidth > 539)
      return false;
    else
      return true;
  }

  
}
