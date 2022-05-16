import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcolonyComponent } from './addcolony.component';

describe('AddcolonyComponent', () => {
  let component: AddcolonyComponent;
  let fixture: ComponentFixture<AddcolonyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcolonyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcolonyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
