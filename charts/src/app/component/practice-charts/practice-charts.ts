import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-practice-charts',
  imports: [],
  templateUrl: './practice-charts.html',
  styleUrl: './practice-charts.css',
})
export class PracticeCharts implements AfterViewInit, OnDestroy {
  @ViewChild('chartCanvas') chartRef!: ElementRef<HTMLCanvasElement>;

  private chart!: Chart;

  ngAfterViewInit(): void {
    this.buildChart();
  }

  private buildChart(): void {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        datasets: [
          {
            label: 'Sales',
            data: [10, 20, 15, 25],
            backgroundColor: 'blue',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
