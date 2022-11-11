import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePlantComponent } from './profile-plant.component';

describe('ProfilePlantComponent', () => {
  let component: ProfilePlantComponent;
  let fixture: ComponentFixture<ProfilePlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePlantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
