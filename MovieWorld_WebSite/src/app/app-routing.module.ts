import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { DeliveryPointComponent } from './delivery-point/delivery-point.component';
import { HeaderComponent } from './header/header.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { OrderComponent } from './order/order.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  { path: '', component: HomePageComponent},
  {path:  ':language/movieDetail/:id', component: MovieDetailComponent },
  {path:  ':language/catalogue', component: CatalogueComponent },
  {path:  ':language/deliveryPoint', component: DeliveryPointComponent }, //detail
  {path:  ':language/login', component: LoginComponent },
  {path:  ':language/registration', component: RegistrationComponent },
  {path:  ':language/cart', component: CartComponent },
  {path:  ':language/order', component: OrderComponent },
  {path:  ':language/news/:id', component: NewsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }