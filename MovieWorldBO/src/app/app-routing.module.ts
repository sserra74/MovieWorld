import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailPageComponent } from './email-page/email-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MoviePageComponent } from './moviePage/moviePage.component';
import { NewsPageComponent } from './news-page/news-page.component';
import { UsersPageComponent } from './usersPage/users-page.component';

const routes: Routes = [
  /*(submit)="login(username, password)"*/
  { path: '', component: LoginPageComponent},
  { path: 'controlPanel/manageMovies', component: MoviePageComponent},
  { path: 'controlPanel/manageUsers', component: UsersPageComponent},
  { path: 'controlPanel/newsPage', component: NewsPageComponent},
  { path: 'controlPanel/emailPage', component: EmailPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
