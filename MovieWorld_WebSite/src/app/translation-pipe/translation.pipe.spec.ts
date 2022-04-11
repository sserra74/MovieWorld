import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationPipe } from './translation.pipe';

describe('TranslationPipe', () => {
  let component: TranslationPipe;
  let fixture: ComponentFixture<TranslationPipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TranslationPipe ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationPipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
