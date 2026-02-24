import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeCharts } from './practice-charts';

describe('PracticeCharts', () => {
  let component: PracticeCharts;
  let fixture: ComponentFixture<PracticeCharts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeCharts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeCharts);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
