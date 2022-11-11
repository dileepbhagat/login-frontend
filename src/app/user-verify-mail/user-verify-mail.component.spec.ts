import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserVerifyMailComponent } from './user-verify-mail.component';

describe('UserVerifyMailComponent', () => {
  let component: UserVerifyMailComponent;
  let fixture: ComponentFixture<UserVerifyMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserVerifyMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserVerifyMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
