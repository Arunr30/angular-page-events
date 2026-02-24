import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, Chart as ChartJS, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

ChartJS.register(...registerables, ChartDataLabels, annotationPlugin);

interface Data {
  stringField: string;
  longField: number;
  minValue: number;
  maxValue: number;
  barColor: string;
  minColor: string;
  maxColor: string;
  overlayColor: string;
}

@Component({
  selector: 'app-threshold-overlay-chart',
  standalone: true,
  imports: [BaseChartDirective, FormsModule],
  templateUrl: './threshold.html',
})
export class ThresholdChartComponent implements OnInit {
  public chartType: 'bar' = 'bar';
  public chartData!: ChartConfiguration<'bar'>['data'];
  public chartOptions!: ChartConfiguration<'bar'>['options'];

  public thresholdMode: 'overlay' | 'dashed' = 'overlay';
  public orientation: 'vertical' | 'horizontal' = 'horizontal';
  public barTension: number = 0.4;

  public backendData: Data[] = [
    {
      stringField: 'C',
      longField: 30,
      minValue: 40,
      maxValue: 50,
      barColor: '#15803d',
      minColor: '#16a34a',
      maxColor: '#dc2626',
      overlayColor: 'rgba(21,128,61,0.25)',
    },
    {
      stringField: 'A',
      longField: 12,
      minValue: 1,
      maxValue: 40,
      barColor: '#064be0',
      minColor: '#059669',
      maxColor: '#b91c1c',
      overlayColor: 'rgba(6,75,224,0.25)',
    },
    {
      stringField: 'B',
      longField: 20,
      minValue: 18,
      maxValue: 30,
      barColor: '#9333ea',
      minColor: '#22c55e',
      maxColor: '#ef4444',
      overlayColor: 'rgba(147,51,234,0.25)',
    },
  ];

  ngOnInit(): void {
    this.initializeChart();
  }

  onModeChange() {
    this.setChartData();
  }

  onOrientationChange() {
    this.setChartOptions();
    this.setChartData();
  }

  onTensionChange() {
    this.setChartData();
  }

  private initializeChart() {
    this.setChartOptions();
    this.setChartData();
  }

  private setChartOptions() {
    const isVertical = this.orientation === 'vertical';

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 400,
        easing: 'easeOutQuart',
      },
      interaction: {
        mode: 'nearest',
        intersect: false,
      },
      indexAxis: isVertical ? 'x' : 'y',
      plugins: {
        legend: {
          display: true,
          position: 'top',
        },
        tooltip: {
          enabled: true,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { display: false },
        },
        y: {
          beginAtZero: true,
          grid: { color: 'rgba(0,0,0,0.05)' },
        },
      },
    };

    this.setAnnotations();
  }

  private setChartData() {
    const labels = this.backendData.map((d) => d.stringField);
    const actualData = this.backendData.map((d) => d.longField);
    const thresholds = this.backendData.map((d) => [d.minValue, d.maxValue]);

    const isVertical = this.orientation === 'vertical';
    const datasets: any[] = [];

    // 🔵 Overlay Mode
    if (this.thresholdMode === 'overlay') {
      datasets.push({
        label: 'Threshold Range',
        data: thresholds,
        backgroundColor: this.backendData.map((d) => d.overlayColor),
        borderRadius: 8,
        barThickness: 50,
        grouped: false,
        order: 1,
        datalabels: { display: false },
        borderSkipped: false,
      });
    }

    // 🟢 Actual Bars (FIXED COLOR ISSUE)
    datasets.push({
      label: 'Actual',
      data: actualData,
      backgroundColor: this.backendData.map((d) => d.barColor),
      borderColor: this.backendData.map((d) => d.barColor),
      borderWidth: 1,
      borderRadius: isVertical ? this.barTension * 20 : 8,
      barThickness: 50,
      grouped: false,
      order: 2,
      borderSkipped: false,
    });

    this.chartData = {
      labels,
      datasets,
    };

    this.setAnnotations();
  }

  private setAnnotations() {
    if (!this.chartOptions) return;

    if (this.thresholdMode !== 'dashed') {
      if (this.chartOptions.plugins) {
        delete (this.chartOptions.plugins as any).annotation;
      }
      return;
    }

    const isVertical = this.orientation === 'vertical';
    const annotations: any = {};

    this.backendData.forEach((d, index) => {
      annotations[`minLine${index}`] = {
        type: 'line',
        xMin: isVertical ? index - 0.4 : d.minValue,
        xMax: isVertical ? index + 0.4 : d.minValue,
        yMin: isVertical ? d.minValue : index - 0.4,
        yMax: isVertical ? d.minValue : index + 0.4,
        borderColor: d.minColor,
        borderWidth: 2,
      };

      annotations[`maxLine${index}`] = {
        type: 'line',
        xMin: isVertical ? index - 0.4 : d.maxValue,
        xMax: isVertical ? index + 0.4 : d.maxValue,
        yMin: isVertical ? d.maxValue : index - 0.4,
        yMax: isVertical ? d.maxValue : index + 0.4,
        borderColor: d.maxColor,
        borderDash: [6, 6],
        borderWidth: 2,
      };
    });

    this.chartOptions.plugins = {
      ...(this.chartOptions.plugins ?? {}),
      annotation: { annotations },
    };
  }
}
