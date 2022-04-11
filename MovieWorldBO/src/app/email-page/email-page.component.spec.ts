import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailPageComponent } from './email-page.component';

describe('EmailPageComponent', () => {
  let component: EmailPageComponent;
  let fixture: ComponentFixture<EmailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
