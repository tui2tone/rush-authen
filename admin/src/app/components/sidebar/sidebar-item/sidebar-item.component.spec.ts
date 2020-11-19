import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SidebarItemComponent } from './sidebar-item.component';

describe('SidebarItemComponent', () => {
  let component: SidebarItemComponent;
  let fixture: ComponentFixture<SidebarItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
