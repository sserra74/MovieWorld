import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

  
export class PathService{
    //public language: string ="";
    public path = new Subject<string>();
   
    pagePath=this.path.asObservable();
   constructor(){}

    setPath(p: string): void
    {
        console.log("p: ",p);
        this.path.next(p);
        this.pagePath.subscribe(p => console.log("router salvata",p));
      
       
        
    }

    getPath():string
    {
        let page:string ="";
         
         
         return page;
    }


    
}