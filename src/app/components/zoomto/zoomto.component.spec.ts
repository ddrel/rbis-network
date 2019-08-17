import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoomtoComponent } from './zoomto.component';

describe('ZoomtoComponent', () => {
  let component: ZoomtoComponent;
  let fixture: ComponentFixture<ZoomtoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoomtoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoomtoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
