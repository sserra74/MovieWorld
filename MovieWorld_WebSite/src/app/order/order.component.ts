import { Component, OnInit } from '@angular/core';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import {Message} from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  value:string="";
  confirm:boolean=false;
  province:any;
  deliveryPoint:any;
  deliveryPointClicked:any;
  constructor(private confirmationService: ConfirmationService) {}

    
  ngOnInit(): void {
  }

  SelectProv(prov:HTMLSelectElement )
  {
    console.log("s: ", prov.value );
      this.deliveryPointClicked=[...this.deliveryPoint];
    
      this.deliveryPointClicked=this.deliveryPoint.filter((item: { province: string; }) => item.province===prov.value);
     console.log("dp:",this.deliveryPointClicked);
  }

  PayOrder(flag: boolean)
  {
      this.confirm=flag;
  }

}
