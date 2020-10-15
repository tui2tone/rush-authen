import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandAnimateComponent } from './expand-animate.component';

describe('ExpandAnimateComponent', () => {
  let component: ExpandAnimateComponent;
  let fixture: ComponentFixture<ExpandAnimateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpandAnimateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpandAnimateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
