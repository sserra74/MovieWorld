import { Subject } from "rxjs";

export class LanguageService
{
        private language = new Subject<string>();
        languageClicked = this.language.asObservable();

        setLanguage(l:string)
        {
            this.language.next(l);
        }
}