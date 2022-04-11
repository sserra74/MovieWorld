import { Component, OnInit } from '@angular/core';

import {MenuItem} from 'primeng/api';
import {MegaMenuItem} from 'primeng/api'; 

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = []; values: string[]=[];
  constructor() { }

  ngOnInit(): void {
    this.items = [{
      label: 'File',
      items: [
          {label: 'Film', icon: 'pi pi-cog', routerLink:"controlPanel/manageMovies"},
          {label: 'Users', icon: 'pi pi-user', routerLink:"controlPanel/manageUsers"},
          {label: 'News', icon: 'pi pi-folder', routerLink:"controlPanel/newsPage"},
          {label: 'Email', icon: 'pi pi-folder', routerLink:"controlPanel/emailPage"}
      ]
  },
  {
      label: 'Edit',
      items: [
          {label: 'Undo', icon: 'pi pi-refresh'},
          {label: 'Redo', icon: 'pi pi-repeat'}
      ]
  }];
  }

}
