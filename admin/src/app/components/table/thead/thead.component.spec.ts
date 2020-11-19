import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { TheadComponent } from './thead.component';

describe('TheadComponent', () => {
  let component: TheadComponent;
  let fixture: ComponentFixture<TheadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ TheadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
