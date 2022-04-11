import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-slide-bar',
  templateUrl: './slide-bar.component.html',
  styleUrls: ['./slide-bar.component.css'],
  providers: [NgbCarouselConfig] 
})
export class SlideBarComponent implements OnInit {
  showNavigationArrows = false;
  showNavigationIndicators = false;
  movies : any[];
  constructor() { 

    


    this.movies = [{
      name: 'Avengers',
      description: '',
      img: 'assets/Images/avengers.jpg',
    },
    {
      name: 'Captain America',
      description: 'Il primo vendicatore',
      img: 'assets/Images/captain_america.jpg',
    },
    {
      name: 'IronMan',
      description: 'La storia di IronMan',
      img: 'assets/Images/Iron_man.jpg',
    },
    {
      name: 'Captain America Civil War',
      description: 'Dopo gli accordi di Socovia...',
      img: 'assets/Images/cacv.jpg',
    }]

  }

  ngOnInit(): void {
  }

}
