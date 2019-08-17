import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideselectionComponent } from './sideselection.component';

describe('SideselectionComponent', () => {
  let component: SideselectionComponent;
  let fixture: ComponentFixture<SideselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
