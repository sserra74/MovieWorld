import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';
import { CookieService } from 'ngx-cookie-service';
import { MovieInCartService } from 'src/service/movieInCart.service';
import { Router } from '@angular/router';
import { MultiSelectModule } from 'primeng/multiselect';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LanguageService } from 'src/service/language.service';
import { Label } from '../models/label.model';
import { Order } from '../models/order.model';
import { type } from 'os';
import { error } from '@angular/compiler/src/util';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})


export class CartComponent implements OnInit {

  //film nel carrello
  movies: any = [];
  //dizionario con titolo del film e quantità di copie nel carrello
  quantityInCart = new Map<string, number>();
  //prezzo totale da pagare
  totalPrice: number = 0;
 
  //array dei punti di consegna (il primo di tutti i punti di consegna, il secondo contiene i dati del punto di consegna cliccato)
  deliveryPoint: any;
  deliveryPointClicked: any;
  //valore inserito nell'inputtext ngPrime
  cf: string = "";
  //booelano per mostrare il popup
  confirm: boolean = false;
  //array delle province
  province: any;
  //array delle label per le traduzione
  labels: any;
  //lingua
  language: string = "";

  valueFromSelectP:string="";
  valueFromSelectA:string="";
  checkInput:boolean=true;

  constructor(private httpClient: HttpClient,
    private cookieService: CookieService,
    private movieInCartService: MovieInCartService,
    private router: Router,
    private languageService: LanguageService,
    private modalService: NgbModal) {

    this.language = "it";
    this.getLabels();
    //chiamato quando si cambia la lingua
    this.languageService.languageChanged.subscribe(l => {

      this.language = l; console.log("lingua in homepage", this.language);
      this.getLabels();
    });
  }




  ngOnInit(): void {
    //Metodo per ottenre i film
    this.getMovie();
    //Metodo per ottenre le città dei punti vendita
    this.getCity();
  }

  //Metodo per il popup di conferma dell'ordine
  open(content: any) {
    this.modalService.open(content);
  }
 

  public getMovie() {
    this.httpClient.get(environment.webSiteUrl + "/Films/GetFilmList/0/" + this.language).subscribe(data => {
      this.movies = data;  //tutti i film nel db
      //prendo solo quelli che son presenti nei cookie, cioè quelli che ho aggiunto nel carrello
      this.movies = this.movies.filter((item: any) => this.cookieService.get(item.title));

      //setto la quantità di copie di ogni film che ci son nel carrello
      this.setQuantityInCartForMovie();
    });
  }

  //Metodo utilizzato per settare il numero di copie dei film presenti sul carrello
  public setQuantityInCartForMovie() {

    //scorro i film  e setto nel dizionario il titolo del film con la relativa quantità di film  
    for (let i = 0; i < this.movies.length; i++)
      this.quantityInCart.set(this.movies[i].title, (Number(this.cookieService.get("movie" + this.movies[i].title))));
  }

  //Metodo utilizzato per restituire, per il film passato, quanti ce ne sono nel carrello
  public getQuantityInCartForMovie(movie: any) {
    return this.quantityInCart.get(movie.title);
  }

  //Prezzo provvisorio del singolo film sulla base del prezzo e della quantità acquistata
  public getTempPrice(price: number, movie: any): number {
    return Number(this.getQuantityInCartForMovie(movie)) * price;
  }

  //Prezzo totale
  public getTotalPrice(): number {
    let price: number = 0;

    for (let i = 0; i < this.movies.length; i++)
      price = price + Number(this.getQuantityInCartForMovie(this.movies[i])) * this.movies[i].price;
    this.totalPrice = price;

    return price;
  }

  //Metodo utilizzato per capire se il sito è aperto da uno smartphone
  smartphoneView(): boolean {
    if (window.innerWidth > 539)
      return false;
    else
      return true;
  }


  //Metodo richiamato quando si cambia la quantità dal carrello
  SelectQuantity(quantity: HTMLSelectElement, i: number, movie: any): void {
    if (quantity.value.includes("Q.tà:"))
      quantity.value = quantity.value + this.getQuantityInCartForMovie(this.movies);
    //setto la quantità selezionata per il film passato anche nei cookie
    this.cookieService.set("movie" + movie.title, (Number(quantity.value) + 1).toString());
    //aggiorno il dizionario
    this.setQuantityInCartForMovie();


  }

  //Metodo utiizzato quando si rimuove dal carrello un film
  removeFromCart(movie: any) {

    this.movies.forEach((element: any, index: number) => {
      if (element.title === movie.title) {
        //elimino il film dalla lista di quelli nel carrello
        this.movies.splice(index, 1);
        //elimino i cookie che gli riguardano
        this.cookieService.delete("movie" + movie.title);
        this.cookieService.delete(movie.title, "/", "localhost", true, "None");

      }
    });
    //setto la quantità dei film nel carrello sulla base del numero di film presenti nel carrello (this.movies)
    this.cookieService.set("quantity", this.movies.length);
    //per gli aggiornamenti dell'icona del carrello
    this.movieInCartService.setQuantity(Number(this.cookieService.get("quantity")));

  }


  //Metodo richiamato quando si conferma l'ordine
  confirmOrder() {
    let order: Order;
    let moviesInCart: any;

    /* Una volta confermato l'ordine, per ogni film presente nel carrello, diminuisco la disponibilità (lato frontend),
       creo l'ordine passando l'id del film e quello dell'utente loggato (presente nei cookie) e inserisco l'ordine nella tabella .

       Successivamente vado ad aggiornare la disponibilità dei film direttamente nel db
    */
    for (let i = 0; i < this.movies.length; i++) {
      this.movies[i].availability--;

      order = new Order(this.movies[i].filmId, JSON.parse(this.cookieService.get("user")).userId);

      this.httpClient.post<Order>(environment.webSiteUrl + "/Order/AddNewOrder", order).subscribe(data => {
      });

      this.httpClient.put<number>(environment.webSiteUrl + "/Films/UpdateAvailability/" + this.movies[i].filmId + "/" + this.language, this.movies[i].availability).subscribe(data => {

        //elimino i cookie del film ordinato e setto la quantità a 0 dato che non ci sono più movie nel carrello 
        this.cookieService.delete("movie" + this.movies[i].title, "/", "localhost", true, "None");
        this.cookieService.delete(this.movies[i].title, "/", "localhost", true, "None");
        this.cookieService.set("quantity", (0).toString());
        this.movieInCartService.setQuantity(0);
      },
        error => { console.error('There was an error!', error.message); });

    }


  }

  //Ottengo i dati dai punti di consegna
  getCity() {
    this.httpClient.get(environment.webSiteUrl + "/DeliveryPoint/GetDeliveryPoint").subscribe(data => {
      this.deliveryPoint = data;
      //Ottengo le province
      this.getProvince();
    });
  }
  //Ottengo le province dei punti di consegna
  getProvince() {
    this.province = this.deliveryPoint.filter((item: { province: string; }, index: any) => this.deliveryPoint.findIndex((s: { province: string; }) => item.province === s.province) === index)

    this.deliveryPointClicked = this.deliveryPoint.filter((item: { province: string; }) => item.province === this.province[0].province);

  }

  //Metodo richiamato quando si seleziona una provincia
  SelectProv(prov: HTMLSelectElement) {
   /* if(this.valueFromSelectP.includes("Via"))
      this.valueFromSelectA=prov.value;
    else
      this.valueFromSelectP=prov.value;*/
    this.deliveryPointClicked = [...this.deliveryPoint];

    this.deliveryPointClicked = this.deliveryPoint.filter((item: { province: string; }) => item.province === prov.value);

  }

  //Metodo richiamato quando si conferma l'ordine e si richiedono i dati di spedizione
  PayOrder(flag: boolean) {
    console.log("payorder");
    if(this.cf=="")// || this.valueFromSelectA=="" || this.valueFromSelectP=="")
    {
      console.log("email: ", JSON.parse(this.cookieService.get("user")));
      this.checkInput = !flag;
    }
    else
    {
      console.log("email: ");
      this.checkInput = !flag;
      this.confirm=flag;
      //cancello i film dal carrello
      this.movies = [];
      //Aggiorno la quantità dei film del carrello dell'icona nell'header in realtime 
      this.movieInCartService.setQuantity((Number(this.cookieService.get("quantity"))));
     
      console.log("user:", JSON.parse(this.cookieService.get("user")).username);
      //Mando la mail di conferma all'utente loggato
      this.httpClient.post<any>(environment.webSiteUrl + "/Email/SendEmail", {userData: JSON.parse(this.cookieService.get("user")).username, keyword:"order"}).subscribe((data: any) => {


      });
    }
  }

  //Metodo utilizzato per ottenere le etichette per la traduzione
  getLabels() {
    this.httpClient.get<Label>(environment.webSiteUrl + "/Label/GetLabelByLanguageCartPage/" + this.language).subscribe((data: any) => {

      this.labels = data
    });
  }

  //Metodo richiamato per ottenere il numero di copie presenti nel magazzino di uno specifico film
  getMovieAvailability(movie: any): number {
    return movie.availability;
  }

}

