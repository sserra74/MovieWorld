import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MenuModule} from 'primeng/menu';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import { MoviePageComponent } from './moviePage/moviePage.component';


import { HttpClientModule } from '@angular/common/http';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormsModule } from '@angular/forms';
import { UsersPageComponent } from './usersPage/users-page.component';
import { HeaderComponent } from './header/header.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { Translation } from './translation.pipe';
import { LanguageService } from './service/language.service';
import {TabViewModule} from 'primeng/tabview';
import { CookieService } from 'ngx-cookie-service';
import { NewsPageComponent } from './news-page/news-page.component';
import {FieldsetModule} from 'primeng/fieldset';
import {SelectButtonModule} from 'primeng/selectbutton';
import { EmailPageComponent } from './email-page/email-page.component';
import {ListboxModule} from 'primeng/listbox';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    MoviePageComponent,
    UsersPageComponent,
    HeaderComponent,
    LoginPageComponent,
    Translation,
    NewsPageComponent,
    EmailPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MenuModule, 
    BrowserAnimationsModule, 
    HttpClientModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FileUploadModule,
    ToolbarModule,
    RatingModule,
    FormsModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    InputTextareaModule,
    FieldsetModule,
    TabViewModule,
    SelectButtonModule,
    ListboxModule
  ],
  providers: [LanguageService, MessageService, ConfirmationService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
