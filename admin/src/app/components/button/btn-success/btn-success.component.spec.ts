import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnSuccessComponent } from './btn-success.component';

describe('BtnSuccessComponent', () => {
  let component: BtnSuccessComponent;
  let fixture: ComponentFixture<BtnSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BtnSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
