import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { FormGroup, FormControl, Validators, Form, FormBuilder } from '@angular/forms';
import { User } from '../models/user.model';
import { ConfirmedValidator } from '../confirmed.validator';
import { CookieService } from 'ngx-cookie-service';

import { Router } from '@angular/router';
import { Guid } from 'guid-typescript';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {


  username: any;
  usersList: User[] = [];

  passwordMatch: boolean = false;
  usernameAlreadyExists: boolean = false;
  passwordLength: boolean = false;
  registrationSuccess: boolean = false;
  emailAlreadyExists: boolean = false;
  pathPrec: string = "";
  registerForm: FormGroup;
  registrationSubmitted: boolean = false;
  cookieData: any;

  constructor(private httpClient: HttpClient,
    public cookieService: CookieService,
    private router: Router,
    public fb: FormBuilder) {
    
    this.registerForm = fb.group({

      'username': ['', Validators.required],
      'emailL': ['', Validators.required],
      'password': ['', Validators.required],
      'passwordC': ['', Validators.required]
    });
    
  }


  ngOnInit(): void {
    this.getUsers(); 
  }

  getUsers() {
    this.httpClient.get<User[]>(environment.webSiteUrl + "/User/GetUsers").subscribe(data => {
      this.usersList = data;

      console.log(data);

    });
  }

  passwordMatchValidator() {

    if (this.registerForm.controls['password'].value === this.registerForm.controls['passwordC'].value) {
      this.registerForm.controls['passwordC'].setErrors(null);
      console.log("2")
    } else {
      this.registerForm.controls['passwordC'].setErrors({ mismatch: true });
      console.log("3")
    }

  }
  checkInput(email: HTMLInputElement, username: HTMLInputElement, password: HTMLInputElement, passwordC: HTMLInputElement) {

    this.registrationSubmitted = true;
    //this.passwordMatchValidator();




  /* if (this.usersList.find((item: { username: string; }) => item.username == username.value) || username.value.length == 0)
      this.usernameAlreadyExists = true;
    if (password.value.length < 8)
      this.passwordLength = true;
    if (password.value != passwordC.value)
      this.passwordMatch = true;
    if (this.usersList.find((item: { email: string; }) => item.email == email.value))
      this.emailAlreadyExists = true;
    if (this.usernameAlreadyExists == false && this.passwordLength == false && this.passwordMatch == false && this.emailAlreadyExists == false) {
      this.registrationSuccess = true;*/




    //  let u: User = new User();
     // u.password = password.value;
     // u.username = username.value;
    //  u.email = email.value;
    //  this.newUserInDatabase(u);
    //  this.register(username.va, u.password, u.email);
    //  this.pathService.path.subscribe(p => {
    //    this.pathPrec = p;
    //    console.log(p)
    //  });


   /* }
    else {

      username.value = "";
      password.value = "";
      passwordC.value = "";
      email.value = "";
      this.passwordLength = false;
      this.usernameAlreadyExists = false;
      this.emailAlreadyExists = false;
      this.passwordMatch = false;

    }*/
  }
  newUserInDatabase(u: User) {
    this.registrationSuccess = true;
    console.log("utente: ",u);
    this.httpClient.post<User>(environment.webSiteUrl + "/User/AddNewUser", u).subscribe(data => {
      console.log(data);
    });

  }

  registration(username: string, password: string, email: string) {
    this.registrationSubmitted=true;
    console.log("valid", username, password, email);
    this.passwordMatchValidator();
   if(this.registerForm.valid)
   {
    
    console.log("valid");
    let user: User = new User(username, password, email);
    this.newUserInDatabase(user);
    
    this.cookieService.set("user", JSON.stringify(user));                               
    this.cookieData = this.cookieService.getAll();
    
    console.log(this.pathPrec);
    setTimeout(() => {
      this.router.navigateByUrl(this.cookieService.get("pathPrec"));
    }, 1000);
    this.httpClient.post<any>(environment.webSiteUrl + "/Email/SendEmail", {userData: JSON.parse(this.cookieService.get("user")).username, keyword:"registration"}).subscribe((data: any) => {


    });
    console.log("get: ", this.cookieService.getAll());
  }
  else
  {
    console.log("u",this.registerForm.controls['username'].value);
    console.log("e",this.registerForm.controls['emailL'].value);
    console.log("p",this.registerForm.controls['password'].value);
    console.log("pc",this.registerForm.controls['passwordC'].value);
    
    this.registrationSuccess=false;
    //this.registerForm.reset();
    console.log("invalid",  document.getElementsByClassName('ng-invalid'));
  }
    
  }

  get email() { return this.registerForm.controls['email']; }


  get f() {
    return this.registerForm.controls;
  }

  onPasswordChange() {

  }

}
