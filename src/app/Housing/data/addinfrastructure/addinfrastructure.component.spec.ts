import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddinfrastructureComponent } from './addinfrastructure.component';

describe('AddinfrastructureComponent', () => {
  let component: AddinfrastructureComponent;
  let fixture: ComponentFixture<AddinfrastructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddinfrastructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddinfrastructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
