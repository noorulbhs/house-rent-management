import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentChartComponent } from './rent-chart.component';

describe('RentChartComponent', () => {
  let component: RentChartComponent;
  let fixture: ComponentFixture<RentChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
