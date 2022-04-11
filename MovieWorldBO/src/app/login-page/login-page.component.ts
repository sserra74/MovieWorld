import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output } from '@angular/core';
import { User } from '../user.model';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})


export class LoginPageComponent implements OnInit {

  @Output() loginEvent= new EventEmitter<boolean>()
  @Output() usernameEvent= new EventEmitter<string>()
  user: User[] ;
  userExists:boolean=false; 
 
  
  constructor(private httpClient: HttpClient, private router: Router, private cookieService: CookieService) {
   // this.user = ({} as User)
   this.loginEvent.emit(this.userExists);
   this.user= [];
   }
   
  ngOnInit(): void {
    this.httpClient.get(environment.webSiteUrl+"/User/GetAdmin/").subscribe((data: any) => {this.user=data});
   
  }

  login(username: HTMLInputElement, password: HTMLInputElement)
  {
   
        this.user=this.user.filter((user: User) => user.username.includes(username.value) && user.password.includes(password.value));
   
        if(this.user.length==0)
        {
          this.userExists=true;
          this.loginEvent.emit(this.userExists);
          console.log(this.user);
        }
        else
        {
          this.cookieService.set("user", username.value);
          this.usernameEvent.emit(username.value);
          this.loginEvent.emit(this.userExists);
          console.log(this.user);
          this.router.navigateByUrl("controlPanel/manageMovies");
        }

  }

}
