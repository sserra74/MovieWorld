import { Subject } from "rxjs";

  
export class mvoiesInChart{
    //public language: string ="";
    private movies = new Subject<any>();
   
    mvoiesInChart=this.movies.asObservable();
   constructor(){
        //  this.language = "it";
        }

    
    

     /*   setLanguage(l:string):void 
        {
            this.language=l; 
        }  */
        
        
        setLanguage(movieClicked: any): void
        {
        //  this.mvoiesInChart.next(movieClicked);
        }
    
}