export class News
{
    idNews?:string;
    title?:string;
    subTitle?:string;
    text?:string;
    image?:string;

    constructor( idNews:string, title:string, subTitle:string, text:string, image:string) {
   
        this.idNews=idNews;
        this.title=title;
        this.subTitle=subTitle;
        this.text=text;
        this.image=image;
       }
    
}