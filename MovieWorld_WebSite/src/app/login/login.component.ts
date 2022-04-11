import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';

import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {

  focus:boolean=false;
  a:string="";
  loginForm: FormGroup;
  userExists:boolean=true;
  pathPrec: string="";
  users: User[]=[];
  cookieData: any;
  submit=false;
  userFromCookie: string="";
  constructor(private httpClient: HttpClient,  
              public fb: FormBuilder, 
              private router: Router,
              public cookieService: CookieService ) { 
    console.log("login");
    
    this.loginForm= fb.group({
      'username': ['',Validators.required],
      'password': ['', Validators.required,Validators.minLength(8)], 
    });
   }

  ngOnInit(): void {
   
  //  this.cookieService.deleteAll('/');
    //let a=this.cookieData.username;
    console.log("cookie",this.cookieService.getAll());
    console.log("c'è un utente?",this.cookieService.check("user"));
    this.cookieData=this.cookieService.getAll();
    //console.log(a);
    
    this.getUsers();

    if(this.cookieService.check("user"))
    {
      this.userFromCookie=this.cookieService.get("user");
    
        console.log("ho un utente già loggato");
        this.userExists=true;
    }
    else
      this.userExists=false;
   
    
  }

  OnFocus()
  {
   
    console.log("focus");
    
  }
  getUsers()
  {
    this.httpClient.get<User[]>(environment.webSiteUrl+"/User/GetUsers").subscribe(data =>{
      this.users=data;
     
    });
  }
  login(username: HTMLInputElement, password: HTMLInputElement)
  {
    
    this.submit=true;
      this.users=this.users.filter(user => user.username.includes(username.value) && user.password.includes(password.value));
      console.log(this.users);
      if(this.users.length>0)
      {
        
          this.userExists=true;
          this.cookieService.set(username.value, password.value);
          setTimeout(() =>{
            this.router.navigateByUrl(this.pathPrec);
          },1000);
      }
      else
        this.userExists=false;
    

   
    
   // this.credentials.setCredentials(username.value, password.value);
  }

}


