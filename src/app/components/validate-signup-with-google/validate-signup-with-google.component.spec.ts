import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidateSignupWithGoogleComponent } from './validate-signup-with-google.component';

describe('ValidateSignupWithGoogleComponent', () => {
  let component: ValidateSignupWithGoogleComponent;
  let fixture: ComponentFixture<ValidateSignupWithGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidateSignupWithGoogleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidateSignupWithGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
