import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVechileComponent } from './view-vechile.component';

describe('ViewVechileComponent', () => {
  let component: ViewVechileComponent;
  let fixture: ComponentFixture<ViewVechileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVechileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVechileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
