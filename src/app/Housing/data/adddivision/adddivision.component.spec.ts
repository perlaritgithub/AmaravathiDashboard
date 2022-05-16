import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddivisionComponent } from './adddivision.component';

describe('AdddivisionComponent', () => {
  let component: AdddivisionComponent;
  let fixture: ComponentFixture<AdddivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdddivisionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdddivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
