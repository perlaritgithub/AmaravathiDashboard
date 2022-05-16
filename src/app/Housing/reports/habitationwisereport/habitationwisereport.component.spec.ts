import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitationwisereportComponent } from './habitationwisereport.component';

describe('HabitationwisereportComponent', () => {
  let component: HabitationwisereportComponent;
  let fixture: ComponentFixture<HabitationwisereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabitationwisereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabitationwisereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
