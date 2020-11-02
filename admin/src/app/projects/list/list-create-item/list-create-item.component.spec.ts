import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCreateItemComponent } from './list-create-item.component';

describe('ListCreateItemComponent', () => {
  let component: ListCreateItemComponent;
  let fixture: ComponentFixture<ListCreateItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCreateItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCreateItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
