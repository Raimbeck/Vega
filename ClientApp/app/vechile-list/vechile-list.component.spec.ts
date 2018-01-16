import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VechileListComponent } from './vechile-list.component';

describe('VechileListComponent', () => {
  let component: VechileListComponent;
  let fixture: ComponentFixture<VechileListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VechileListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VechileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
