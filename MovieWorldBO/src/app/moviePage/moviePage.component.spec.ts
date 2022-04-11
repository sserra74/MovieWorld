import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviePageComponent } from './moviePage.component';

describe('PageComponent', () => {
  let component: MoviePageComponent;
  let fixture: ComponentFixture<MoviePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoviePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(()  => {
    fixture = TestBed.createComponent(MoviePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
