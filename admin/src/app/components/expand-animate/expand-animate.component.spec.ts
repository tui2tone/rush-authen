import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ExpandAnimateComponent } from './expand-animate.component';

describe('ExpandAnimateComponent', () => {
  let component: ExpandAnimateComponent;
  let fixture: ComponentFixture<ExpandAnimateComponent>;

  beforeEach(waitForAsync(() => {
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
