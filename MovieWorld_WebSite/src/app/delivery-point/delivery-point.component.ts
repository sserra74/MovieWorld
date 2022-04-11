import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { environment } from 'src/environments/environment.prod';
import { LanguageService } from '../../service/language.service';
import { Label } from '../models/label.model';
@Component({
  selector: 'app-delivery-point',
  templateUrl: './delivery-point.component.html',
  styleUrls: ['./delivery-point.component.css']
})
export class DeliveryPointComponent implements OnInit {

  deliveryP: any;
  deliveryPCopy: any;
  deliveryPointClicked: any;
  labels: any;
  public prov:any;
  language: string =  navigator.language;
  constructor(private httpClient: HttpClient,private languageService: LanguageService) { 

    this.getLabels();
    if(this.language.includes("it"))
      this.language="it";
    else
      this.language="en";
    console.log(this.language)
    this.languageService.languageChanged.subscribe(l =>{
                 
      this.language=l; console.log("lingua in homepage", this.language);
      this.getLabels();
    });
  }

  ngOnInit(): void {
    this.getDeliveryP();
   this.getLabels();
  }

  getDeliveryP()
  {
    this.httpClient.get(environment.webSiteUrl+"/DeliveryPoint/GetDeliveryPoint").subscribe(data =>{
      
      this.deliveryP = data;
      this.deliveryPCopy=data;
      this.prov=this.deliveryP.filter((item: { province: string; }, index: any) => this.deliveryP.findIndex((s: { province: string; }) => item.province === s.province) === index)
     
      this.deliveryPointClicked=this.deliveryP.filter((item: { province: string; }) => item.province===this.prov[0].province);
      console.log(" fs",this.deliveryPointClicked);
    });
  }

 
  getProv()
  {
    
   
   
  }
  SelectProv(prov:HTMLSelectElement )
  {
  
    console.log("s: ", prov.value );
      this.deliveryP=[...this.deliveryPCopy];
    
      this.deliveryPointClicked=this.deliveryP.filter((item: { province: string; }) => item.province===prov.value);
     
  }
  getLabels()
  {
    this.httpClient.get<Label>(environment.webSiteUrl+"/Label/GetLabelByLanguageDeliveryPointPage/"+this.language).subscribe((data: any) =>{ 
    
      this.labels=data
      //this.labels=this.labels.filter((item: { key: string | string[]; }) => item.key.includes("Catalog"));
      console.log("labels",this.labels);
    });
  }


}

