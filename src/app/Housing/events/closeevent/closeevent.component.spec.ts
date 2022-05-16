import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseeventComponent } from './closeevent.component';

describe('CloseeventComponent', () => {
  let component: CloseeventComponent;
  let fixture: ComponentFixture<CloseeventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CloseeventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
