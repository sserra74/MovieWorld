import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import  {NgbButtonsModule, NgbModal, NgbModalConfig, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SlideBarComponent } from './slide-bar/slide-bar.component'
import { SwiperModule } from 'swiper/angular'; 
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LanguageComponent } from './language/language.component';
import { TranslationPipe } from './translation-pipe/translation.pipe';
import { LanguageService } from '../service/language.service';
import { CatalogueComponent } from './catalogue/catalogue.component';
import { DeliveryPointComponent } from './delivery-point/delivery-point.component';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { RegistrationComponent } from './registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CartComponent } from './cart/cart.component';
import { MovieInCartService } from 'src/service/movieInCart.service';
import { OrderComponent } from './order/order.component';
import {DialogModule} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {MultiSelectModule} from 'primeng/multiselect';
import { SidebarModule } from "primeng/sidebar";
import { BrowserAnimationsModule } 
    from "@angular/platform-browser/animations";

    import {MenuModule} from 'primeng/menu';
import { NewsPageComponent } from './news-page/news-page.component';

  
export class YourAppModule {
}
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    SlideBarComponent,
    HeaderComponent,
    FooterComponent,
    MovieDetailComponent,
    LanguageComponent,
    TranslationPipe,
    CatalogueComponent,
    DeliveryPointComponent,
    LoginComponent,
   RegistrationComponent,
   CartComponent,
   OrderComponent,
   NewsPageComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    SwiperModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    MultiSelectModule,
    SidebarModule,
    BrowserModule,
    BrowserAnimationsModule,
    MenuModule
  ],
  providers: [LanguageService, CookieService, MovieInCartService],
  bootstrap: [AppComponent,]
})
export class AppModule { }
