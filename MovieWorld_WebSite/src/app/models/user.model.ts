
import { Guid } from "guid-typescript";

export class User{
    public userId: string ;
    email: string; 
    password: string;
    username: string;

    constructor(username:string, password:string, email:string)

    {   //console.log("guid",guid);
        this.userId=Guid.create().toString();
       
        this.username = username;
        this.password = password;
        this.email = email;
      
    }

   
   
    
}