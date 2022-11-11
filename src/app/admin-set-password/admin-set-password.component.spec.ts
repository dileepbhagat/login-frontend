import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSetPasswordComponent } from './admin-set-password.component';

describe('AdminSetPasswordComponent', () => {
  let component: AdminSetPasswordComponent;
  let fixture: ComponentFixture<AdminSetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSetPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
