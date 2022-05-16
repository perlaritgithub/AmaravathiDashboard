import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddstageComponent } from './addstage.component';

describe('AddstageComponent', () => {
  let component: AddstageComponent;
  let fixture: ComponentFixture<AddstageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddstageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddstageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
