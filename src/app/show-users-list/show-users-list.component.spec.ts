import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowUsersListComponent } from './show-users-list.component';

describe('ShowUsersListComponent', () => {
  let component: ShowUsersListComponent;
  let fixture: ComponentFixture<ShowUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowUsersListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
