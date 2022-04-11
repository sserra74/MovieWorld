import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translation'
})
export class Translation implements PipeTransform {

  
  transform(stringInCurrentLanguage: string, labels:any) {
    for(let item of labels)
        {
            if(item.key.includes(stringInCurrentLanguage.replace(/\s/g, ""))) 
              return item.labelContent;
        }
        return stringInCurrentLanguage;
  }

}
