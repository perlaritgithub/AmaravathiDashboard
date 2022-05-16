import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddhabitationComponent } from './addhabitation.component';

describe('AddhabitationComponent', () => {
  let component: AddhabitationComponent;
  let fixture: ComponentFixture<AddhabitationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddhabitationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddhabitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
