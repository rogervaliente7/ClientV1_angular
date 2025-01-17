import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthWithGoogleComponent } from './auth-with-google.component';

describe('AuthWithGoogleComponent', () => {
  let component: AuthWithGoogleComponent;
  let fixture: ComponentFixture<AuthWithGoogleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthWithGoogleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthWithGoogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
