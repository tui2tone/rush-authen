import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ProjectSelectorComponent } from './project-selector.component';

describe('ProjectSelectorComponent', () => {
  let component: ProjectSelectorComponent;
  let fixture: ComponentFixture<ProjectSelectorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
