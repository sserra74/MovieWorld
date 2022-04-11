import { Subject } from "rxjs";

  
export class MovieInCartService{
    //public language: string ="";
    private quantity = new Subject<number>();
    
    quanityUpdate=this.quantity.asObservable();
   constructor(){}

    setQuantity(length: number): void
    {
        this.quantity.next(length);
    }
    
}