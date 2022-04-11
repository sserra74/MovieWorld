import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MovieWorldBO';
  userExist: boolean = false;
  username : string ="";
  alreadyLogged: boolean = false;
  constructor(private cookieService: CookieService, private router: Router)
  {
    

  }

  ngOnInit(): void {
    if(this.cookieService.check('user')==true)
    {
      this.alreadyLogged=true;
      this.userExist=true;
      this.router.navigateByUrl("controlPanel/manageMovies");
    }
  }

  login(userExist:boolean)
  {
      console.log("u",userExist);
      this.userExist=!userExist;
  }

  setUsername(username:string)
  {
      this.username=username;
  }
}
