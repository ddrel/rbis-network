import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadinfoComponent } from './roadinfo.component';

describe('RoadinfoComponent', () => {
  let component: RoadinfoComponent;
  let fixture: ComponentFixture<RoadinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoadinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoadinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
