import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessUserCreationComponent } from './process-user-creation.component';

describe('ProcessUserCreationComponent', () => {
  let component: ProcessUserCreationComponent;
  let fixture: ComponentFixture<ProcessUserCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessUserCreationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessUserCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
