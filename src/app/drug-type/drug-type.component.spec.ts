import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrugTypeComponent } from './drug-type.component';

describe('DrugTypeComponent', () => {
  let component: DrugTypeComponent;
  let fixture: ComponentFixture<DrugTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DrugTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DrugTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
