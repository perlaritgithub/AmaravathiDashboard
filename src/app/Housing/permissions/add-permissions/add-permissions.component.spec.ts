import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPermissionsComponent } from './add-permissions.component';

describe('AddPermissionsComponent', () => {
  let component: AddPermissionsComponent;
  let fixture: ComponentFixture<AddPermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
