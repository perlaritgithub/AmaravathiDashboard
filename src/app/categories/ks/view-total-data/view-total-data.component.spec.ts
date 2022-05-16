import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTotalDataComponent } from './view-total-data.component';

describe('ViewTotalDataComponent', () => {
  let component: ViewTotalDataComponent;
  let fixture: ComponentFixture<ViewTotalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTotalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTotalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
