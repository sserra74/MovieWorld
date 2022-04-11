import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment.prod';
import { User } from './user';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent implements OnInit {

  users:any=[];
  selectedUsers: User[]=[];
  submitted: boolean=false;
  userDialog: boolean=false;
  user: User = {} ;
  constructor(private httpClient: HttpClient,
              private confirmationService: ConfirmationService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.httpClient.get(environment.webSiteUrl + "/User/GetUsers").subscribe(data => {
      this.users = data;
      console.table(this.users);
    });
  }

  openNew() {
    this.user = {};
    this.submitted = false;
    this.userDialog = true;
}

  setStatusStock()
  {
   
  }

editProduct(user: User) {
  console.log("dknfdkjf");
   this.user = {...user};
     
      this.userDialog = true;
 
 
}

deleteProduct(user: User) {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + user.userId + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.users = this.users.filter((item:  any) => item.userId !== user.userId);
          console.log(this.users);
          this.httpClient.delete(environment.webSiteUrl+"/User/DeleteUser/"+user.userId ).subscribe(data => {console.log("d");});
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
          
      }
  });
}


saveProduct() {
  this.submitted = true;
 
  if (this.user.username) {
   console.log("user: ",this.user.userId);
      if (this.user.userId) {
          this.users[this.findIndexById(this.user.userId)] = this.user;                
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
          this.httpClient.put<User>(environment.webSiteUrl+"/User/UpdateUser/",this.user ).subscribe(data => 
            {  console.log("e"); });
      }
      else {
          this.user.userId= this.createId();
          this.httpClient.post<User>(environment.webSiteUrl + "/User/AddNewUser",this.user).subscribe(data => {
            
            console.table("aggiunto");
          });
          this.users.push(this.user);
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
       
         
          
      }

      this.users = [...this.users];
      this.userDialog = false;
      this.user = {};
  }
}


findIndexById(id: string): number {
  let index = -1;
  for (let i = 0; i < this.users.length && index==-1; i++) {
      if (this.users[i].userId === id) {
          index = i;
         
      }
  }
  return index;
}


createId(): string {
  
  return Guid.create().toString();
}


deleteSelectedProducts() {
  this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.users = this.users.filter((val: User) => !this.selectedUsers.includes(val));
          this.selectedUsers = this.selectedUsers.filter((val: User) => !this.selectedUsers.includes(val));
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
      }
  });
}
hideDialog() {
  this.userDialog = false;
  this.submitted = false;
}

}



