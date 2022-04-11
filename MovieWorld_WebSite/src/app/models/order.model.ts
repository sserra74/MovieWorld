
import { Guid } from "guid-typescript";

export class Order{
    orderId: string; 
    userId: string; 
    filmId: string;
    
    constructor(filmId:string, userId:string)

    {   //console.log("guid",guid);
        this.orderId=Guid.create().toString();
       
        this.userId = userId;
        this.filmId = filmId;
        
      
    }

   
   
    
}