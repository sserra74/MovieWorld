import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment.prod';
import { Email } from '../email.model';

@Component({
  selector: 'app-email-page',
  templateUrl: './email-page.component.html',
  styleUrls: ['./email-page.component.css']
})
export class EmailPageComponent implements OnInit {

  emailList: any = [];
  selectedEmails: Email[] = [];
  submitted: boolean = false;
  emailDialog: boolean = false;
  email: Email = {};
  textHighlighted: string = "";
  keywords: string[] = ["registration","news","order" ];
  selectedKeyword: string="";
  constructor(private httpClient: HttpClient,
    private confirmationService: ConfirmationService,
    private messageService: MessageService) {

      this.keywords = ["registration","news","order" ];
     }

  ngOnInit(): void {

    this.httpClient.get(environment.webSiteUrl + "/Email/GetEmailList").subscribe(data => {
      this.emailList = data;
      console.table(this.emailList);
    });
  }

  openNew() {
    this.email = {};
    this.submitted = false;
    this.emailDialog = true;
  }

  editProduct(email: Email) {
    console.log("dknfdkjf");
    this.email = { ...email };
    this.emailDialog = true;
  }

  deleteProduct(email: Email) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + email.keyword + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.emailList = this.emailList.filter((item: any) => item.idEmail !== email.idEmail);
        console.log(this.emailList);
        this.httpClient.delete(environment.webSiteUrl + "/Email/DeleteEmail/" + email.idEmail).subscribe(data => { console.log("d"); });
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });

      }
    });
  }

  createId(): string {

    return Guid.create().toString();
  }
  saveProduct() {
    this.submitted = true;
    console.table(this.email);

    if (this.email.title) {
      if (this.email.idEmail) {
        this.emailList[this.findIndexById(this.email.idEmail)] = this.email;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        this.httpClient.put<Email>(environment.webSiteUrl + "/Email/UpdateEmail/", this.email).subscribe(data => { console.log("e"); });
      }
      else {
        if (this.checkKeywordAlreadyExists() == false && (this.email.keyword!="registration" && this.email.keyword!="news" && this.email.keyword!="order")) {
          this.email.idEmail = this.createId();

          this.httpClient.post<Email>(environment.webSiteUrl + "/Email/AddNewEmail", this.email).subscribe(data => {

            console.table("aggiunto");
          });

          this.emailList.push(this.email);
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }
        else
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Keyword Already Exist', life: 3000 });


      }

      this.emailList = [...this.emailList];
      this.emailDialog = false;
      this.email = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.emailList.length && index == -1; i++) {
      if (this.emailList[i].idEmail === id) {
        index = i;

      }
    }
    return index;
  }

  checkKeywordAlreadyExists(): boolean {
    
    for (let i = 0; i < this.emailList.length; i++)
      if (this.email.keyword?.includes(this.emailList[i].keyword))
      {
        console.log("key: ",this.emailList[i].keyword);
        return true;
      }

    return false;
  }
  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.emailList = this.emailList.filter((val: Email) => !this.selectedEmails.includes(val));
        this.selectedEmails = this.selectedEmails.filter((val: Email) => !this.selectedEmails.includes(val));
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
      }
    });
  }
  hideDialog() {
    this.emailDialog = false;
    this.submitted = false;
  }

  captureHiglitedText() {
    let textHTML = window.getSelection();
    if (textHTML)
      this.textHighlighted = textHTML.toString();

  }

  getElementForHtmlText(element: string): string | undefined {
    switch (element) {
      case "keyword":
        if (this.email.keyword)
          return this.email.keyword;

        break;
      case "title":
        if (this.email.title)
          return this.email.title;
        break;
      case "object":
        if (this.email.object)
          return this.email.object;
        break;
      case "body":
        if (this.email.body)
          return this.email.body;
        break;

    }
    return "";
  }
  addHtmlToText(tag: string, element: string) {
    console.log("w", window.getSelection());

    let textHighlighted = window.getSelection();
    let start;
    let finalString: string = "";
    console.log("w", textHighlighted);
    let el = this.getElementForHtmlText(element);

    console.log("elemento: ",el);
    if (textHighlighted) {
      if (textHighlighted.toString() != "") {

        if (el) {

          start = el.indexOf(textHighlighted.toString());
          console.log("start: ",start, "el: ",el);
          for (let i = 0; i < start; i++)
            finalString = finalString + el[i];

          switch (tag) {
            case "bold":
              finalString = finalString + "<b>" + textHighlighted.toString() + "</b>";
              break;
            case "italic":
              finalString = finalString + "<i>" + textHighlighted.toString() + "</i>";
              break;
            case "underline":
              finalString = finalString + "<u>" + textHighlighted.toString() + "</u>";
              break;

          }

          for (let i = textHighlighted.toString().length + start; i < el.length; i++)
            finalString = finalString + el[i];
            console.log("fs: ",finalString);
          switch (element) {
            case "keyword":
              this.email.keyword = finalString;
              break;
            case "title":
              this.email.title = finalString;
              break;
            case "object":
              this.email.object = finalString;
              break;
            case "body":
              this.email.body = finalString;
              break;

          }
        }

      }
      else {
        switch (tag) {
          case "bold":

            this.email.keyword = el == "keyword" ? this.email.keyword + "<b> </b>" :
              (el == "body" ? this.email.body + "<b> </b>" :
                (el == "object" ? this.email.object + "<b> </b>" :
                  (el == "title" ? this.email.title + "<b> </b>" : "")));
            break;
          case "italic":

            if (el == "keyword")
              this.email.keyword += "<i> </i>";
            else
              if (el == "body")
                this.email.body += "<i> </i>";
              else
                if (el == "object")
                  this.email.object += "<i> </i>";
                else
                  this.email.title += "<i> </i>";
            break;
          case "underline":
            if (el == "keyword")
              this.email.keyword += "<u> </u>";
            else
              if (el == "body")
                this.email.body += "<u> </u>";
              else
                if (el == "object")
                  this.email.object += "<u> </u>";
                else
                  this.email.title += "<u> </u>";

            break;

        }
      }
    }

  }

  




}
