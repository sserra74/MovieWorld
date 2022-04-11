import { Subject } from "rxjs";

  
export class LanguageService{
    //public language: string ="";
    private language = new Subject<string>();
    public l: string ="";
    languageChanged=this.language.asObservable();
   constructor(){
        //  this.language = "it";
        }

        getLanguage(): string
        {
           this.languageChanged.subscribe(value => { this.l=value});
           return this.l;
        }
    

     /*   setLanguage(l:string):void 
        {
            this.language=l; 
        }  */
        
        
        setLanguage(l: string): void
        {
          this.language.next(l);
        }
    
}