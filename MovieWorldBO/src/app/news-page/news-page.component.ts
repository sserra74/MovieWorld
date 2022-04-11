import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { ConfirmationService, MessageService } from 'primeng/api';

import { environment } from 'src/environments/environment.prod';
import { News } from '../news.module';

import { NewsLabel } from '../newslabel.model';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {

  newsList: any = [];
  selectedNews: any = [];
  newsDialog: boolean = false;
  submitted: boolean = false;
  news: NewsLabel = {};
  justifyOptions: any=[];
  align: string="text";
  textHighlighted: string="";
  value: any;
  constructor(private httpClient: HttpClient, private messageService: MessageService,
              private confirmationService: ConfirmationService) {
                this.justifyOptions = [
                  {icon: 'pi pi-align-left', justify: 'Left'},
                  {icon: 'pi pi-align-right', justify: 'Right'},
                  {icon: 'pi pi-align-center', justify: 'Center'},
                  {icon: 'pi pi-align-justify', justify: 'Justify'},
                  
              ];
               }

  ngOnInit(): void {

    this.getNews();
  }

  getNews()
  {
    this.httpClient.get(environment.webSiteUrl + "/News/GetNewsList/it").subscribe(data => {
      this.newsList = data;
      console.table(this.newsList);
    });
  }

  openNew() {
    this.news = {};
    this.submitted = false;
    this.newsDialog = true;
  }


  editProduct(news: any) {
    this.news = {...news };
    this.newsDialog = true;
  }

  deleteProduct(news: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + news.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.newsList = this.newsList.filter((val: { id: any; }) => val.id !== news.idNews);
        this.httpClient.delete(environment.webSiteUrl + "/NewsLabel/DeleteNews/" + news.idNews + "/it").subscribe(data => { console.log("d"); });
        this.httpClient.delete(environment.webSiteUrl + "/News/DeleteNews/" + news.idNews + "/it").subscribe(data => { console.log("d1"); this.news = {}; });


        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
       
      }
    });
  }


  saveProduct() {
    this.submitted = true;
    let newsInTable: any = {};
    if (this.news.title) {
      console.log("id: ", this.news.title);
      if (this.news.idNews) {
        this.newsList[this.findIndexById(this.news.idNews)] = this.news;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        console.log("Sto aggiornando");
        this.InsertInTableFilm("PUT");
        this.InsertTableFilmLable("PUT");
      }
      else {
        this.news.idNews = this.createId();
        this.news.idMultilingual="f24d1158-8400-4f03-9187-233bfc53f5fb";
        this.newsList.push(this.news);
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        console.log("Sto aggiungendo");
        this.InsertInTableFilm("POST");
        this.InsertTableFilmLable("POST");
       // console.log(newsInTable);

      }

      this.newsList = [...this.newsList];
      this.newsDialog = false;
      this.news = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.newsList.length && index == -1; i++) {
      if (this.newsList[i].idNews === id) {
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
        this.newsList = this.newsList.filter((val: any) => !this.selectedNews.includes(val));
        this.selectedNews = this.selectedNews.filter((val: any) => !this.selectedNews.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }
  hideDialog() {
    this.newsDialog = false;
    this.submitted = false;
  }

  addHtmlToText(tag: string)
  {
    console.log("w",window.getSelection());
    
    let textHighlighted =window.getSelection();
    let start;
    let finalString: string= "";
    console.log("w",textHighlighted);
    if(textHighlighted)
    {
      if(textHighlighted.toString()!="")
      {
        if(this.news.text)
        {
          start=this.news.text.indexOf(textHighlighted.toString());
          for(let i=0;i<start;i++)
              finalString=finalString+this.news.text[i];

          switch(tag)
          {
            case "bold": 
              finalString=finalString+"<b>"+textHighlighted.toString()+"</b>";  
              break;
            case "italic":
              finalString=finalString+"<i>"+textHighlighted.toString()+"</i>";
              break;
            case "underline":
              finalString=finalString+"<u>"+textHighlighted.toString()+"</u>";
              break;

          }
          
          for(let i=textHighlighted.toString().length+start;i<this.news.text.length;i++)
            finalString=finalString+this.news.text[i];

          this.news.text=finalString;
        }
      }
      else
      {
        switch(tag)
        {
          case "bold": 
            this.news.text=this.news.text+"<b> </b>"; 
            break;
          case "italic":
            this.news.text+="<i> </i>"; 
            break;
          case "underline":
            this.news.text+="<u> </u>"; 
            break;

        }
      }
  }
     
  }

  setAlignment(tag:string)
  {
    this.align=tag;
  }

  captureHiglitedText()
    {
      let textHTML =window.getSelection();
      if(textHTML)
        this.textHighlighted =textHTML.toString();

    }

    InsertInTableFilm(mode: string) {
      console.log("funzione");
      let newsToInsert: News = {};
      newsToInsert.newsID = this.news.idNews;
      newsToInsert.publicationDate=new Date("1-03-2002");
      newsToInsert.image="assets/Images/captain_america.jpg";
     // newsToInsert.image = this.news.image;
    
      if (mode == "POST") {
        this.httpClient.post(environment.webSiteUrl + "/News/InsertNews/"+ "it", newsToInsert).subscribe(data => {
  
          console.table("aggiunto news");
        });
      }
      else {
        this.httpClient.put<any>(environment.webSiteUrl + "/News/UpdateNews/", newsToInsert).subscribe(data => { console.log("e"); });
      }
    }
  
    InsertTableFilmLable(mode: string) {
    /* let newsToInsert: NewsLabel = {};
        newsToInsert.idNews = this.news.idNews;
        newsToInsert.title = this.news.title;
        newsToInsert.subTitle = this.news.subTitle;
        newsToInsert.text = this.news.text;
        newsToInsert.idMultilingual="f24d1158-8400-4f03-9187-233bfc53f5fb";*/

      
      if (mode == "POST") {
       // console.log("news: ",newsToInsert);
        this.httpClient.post<NewsLabel>(environment.webSiteUrl + "/NewsLabel/InsertNews", this.news).subscribe(data => {
          console.table("aggiunto news");
        });

        this.httpClient.post<any>(environment.webSiteUrl + "/Email/SendEmail", {userData: "", keyword:"news"}).subscribe((data: any) => {


        });
      }
      else {
        console.log("sto creando la news da passare ")
        this.httpClient.put(environment.webSiteUrl + "/NewsLabel/UpdateNews/",this.news).subscribe(data => { console.log("e"); });
      }
    }






}
