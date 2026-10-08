import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarStandingChart } from './bar-standing-chart';

describe('BarStandingChart', () => {
  let component: BarStandingChart;
  let fixture: ComponentFixture<BarStandingChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarStandingChart],
    }).compileComponents();

    fixture = TestBed.createComponent(BarStandingChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
