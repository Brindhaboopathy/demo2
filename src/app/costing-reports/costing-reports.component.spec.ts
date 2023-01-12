import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostingReportsComponent } from './costing-reports.component';

describe('CostingReportsComponent', () => {
  let component: CostingReportsComponent;
  let fixture: ComponentFixture<CostingReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostingReportsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostingReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
