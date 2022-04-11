import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment.prod';
import * as translations from '../../assets/json/translations.json';
import { HeaderComponent } from '../header/header.component';
import {ChangeDetectorRef} from '@angular/core';
import { Label } from '../models/label.model';
@Pipe({
  name: "translation"
})


export class TranslationPipe implements PipeTransform {
   
  
 
  transform(stringInCurrentLanguage: string, labels: any) {
  
        for(let item of labels)
        {
            if(item.key.includes(stringInCurrentLanguage.replace(/\s/g, ""))) 
              return item.labelContent;
        }
        return stringInCurrentLanguage;
      
  }

}
