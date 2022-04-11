export interface Movie {
    filmId?:string;
    title?:string;
    format?:string;
    isSalable?:boolean;
    availability?:number;
    cult?:boolean;
    year?:number;
    price?: number;
    linkImg?:string;
    bgImage?:string;
   shortPlot?: string;
   
}