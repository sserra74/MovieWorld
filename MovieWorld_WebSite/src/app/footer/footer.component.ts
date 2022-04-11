import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  hoverFirstGroup: boolean=false;
  hoverSecondGroup: boolean=false;
  hoverThirdGroup: boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

  setHoverGroup(index: number)
  {
    console.log("cliccko");
    switch(index)
    {
      case 0: 
        this.hoverFirstGroup=!this.hoverFirstGroup;
        break;
      case 1: 
      this.hoverSecondGroup=!this.hoverSecondGroup;
      break;
      case 2: 
      this.hoverThirdGroup=!this.hoverThirdGroup;
      break;
    }
  }

  smartphoneView(): boolean
  {
    if( window.innerWidth>500)
      return false;
    else
      return true;
  }


}
