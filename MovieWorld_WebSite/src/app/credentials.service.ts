import { Subject } from "rxjs";
import { CookieService } from 'ngx-cookie-service';
  
export class CredentialsService{
   
    
  /*  private username=new Subject<string>();
    private password=new Subject<string>();
    usernameLogged=this.username.asObservable();
    passwordLogged=this.password.asObservable();*/

    constructor(public cookieService: CookieService){}

    public setCredentials(userN:string, passW:string)
    {
        this.cookieService.set(userN, passW);
       
      /*  this.username.next(userN);
        this.password.next(passW);*/
    }

    isEmpty():boolean
    {
        return this.cookieService.getAll() ? true: false;
    }
}