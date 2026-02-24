import { Component, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, Chart as ChartJS, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ViewChild } from '@angular/core';

ChartJS.register(...registerables, ChartDataLabels);

interface DatasetConfig {
  label: string;
  data: number[];
  color: string;
  barThickness?: number;
  patternType?: 'crosshatch' | 'dots' | 'dash' | 'diamond';
  datalabels?: {
    color?: string;
    font?: { weight?: 'normal' | 'bold' | number; size?: number };
    formatterType?: 'number' | 'currency' | 'percentage';
  };
}

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [BaseChartDirective, FormsModule, RouterModule, CommonModule],
  templateUrl: './chart.html',
})
export class ChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // Chart type control
  public selectedChartType: 'bar' | 'pie' = 'bar';
  public chartType: 'bar' | 'pie' = 'bar';

  public chartData!: ChartConfiguration<'bar' | 'pie'>['data'];
  public chartOptions!: ChartConfiguration<'bar' | 'pie'>['options'];

  // Controls
  public orientation: 'horizontal' | 'vertical' = 'horizontal';
  public labelPosition: 'top' | 'center' | 'bottom' = 'center';
  public barSize: number = 30;
  public legendPosition: 'top' | 'left' | 'bottom' | 'right' = 'top';
  public isStacked: boolean = false;
  public showPattern: boolean = true;
  public globalPatternType: 'crosshatch' | 'dots' | 'dash' | 'diamond' | 'none' = 'crosshatch';
  public labelFontSize: number = 10;
  public labelFontWeight: 'normal' | 'bold' | number = 'bold';

  // Axis customization
  public xAxisMin?: number = undefined;
  public xAxisMax?: number = undefined;
  public xAxisStepSize?: number = undefined;
  public xGridLines: boolean = true;
  public yAxisMin?: number = undefined;
  public yAxisMax?: number = undefined;
  public yAxisStepSize?: number = undefined;
  public yGridLines: boolean = true;

  // Dataset config
  public config: DatasetConfig[] = [
    {
      label: 'Daily Actual',
      data: [10250, 12540, 12152, 3850, 7890],
      color: '#2196F3',
      barThickness: 30,
      patternType: 'crosshatch',
      datalabels: { color: '#000', font: { weight: 'bold', size: 10 }, formatterType: 'number' },
    },
    {
      label: 'Daily Target',
      data: [9000, 11000, 10000, 5000, 7000],
      color: '#FF5722',
      barThickness: 30,
      patternType: 'dots',
      datalabels: { color: '#000', font: { weight: 'bold', size: 10 }, formatterType: 'number' },
    },
  ];

  public labels: string[] = ['CL1-2', 'CL2-4U', 'CL2-7L', 'CL2-2', 'CL2-4L'];

  // Add data inputs
  public newLabel: string = '';
  public newActual: number | null = null;
  public newTarget: number | null = null;

  ngOnInit(): void {
    this.buildChart();
  }

  buildChart() {
    this.chartType = this.selectedChartType;

    // =========================
    // PIE CHART
    // =========================
    if (this.selectedChartType === 'pie') {
      this.chartData = {
        labels: this.labels,
        datasets: [
          {
            label: this.config[0].label,
            data: this.config[0].data,
            backgroundColor: this.generatePieColors(),
          },
        ],
      };

      this.chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: this.legendPosition },
          datalabels: {
            color: '#fff',
            font: {
              size: this.labelFontSize,
              weight: this.labelFontWeight,
            },
            formatter: (value) => Number(value).toLocaleString(),
          },
        },
      };

      return;
    }

    // =========================
    // BAR CHART
    // =========================
    const isHorizontal = this.orientation === 'horizontal';

    this.chartData = {
      labels: this.labels,
      datasets: this.config.map((ds) => ({
        label: ds.label,
        data: ds.data,
        barThickness: this.barSize,
        backgroundColor: this.showPattern
          ? this.globalPatternType !== 'none'
            ? this.createPattern(ds.color, this.globalPatternType)
            : ds.color
          : ds.color,
        categoryPercentage: 0.8,
        barPercentage: 0.9,
      })),
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: isHorizontal ? 'y' : 'x',
      plugins: {
        legend: { position: this.legendPosition },
        datalabels: {
          color: (ctx) => this.config[ctx.datasetIndex].datalabels?.color || '#000',
          anchor: () =>
            this.labelPosition === 'center'
              ? 'center'
              : this.labelPosition === 'top'
                ? 'end'
                : 'start',
          align: () => {
            if (this.labelPosition === 'center') return 'center';
            return isHorizontal
              ? this.labelPosition === 'top'
                ? 'right'
                : 'left'
              : this.labelPosition === 'top'
                ? 'top'
                : 'bottom';
          },
          offset: () => (this.labelPosition === 'center' ? 0 : 6),
          clamp: true,
          clip: false,
          font: {
            size: this.labelFontSize,
            weight: this.labelFontWeight,
          },
          formatter: (value, ctx) => {
            const format = this.config[ctx.datasetIndex].datalabels?.formatterType;
            switch (format) {
              case 'currency':
                return '$' + Number(value).toLocaleString();
              case 'percentage':
                return value + '%';
              default:
                return Number(value).toLocaleString();
            }
          },
        },
      },
      scales: {
        x: {
          beginAtZero: this.xAxisMin === undefined,
          min: this.xAxisMin,
          max: this.xAxisMax,
          stacked: this.isStacked,
          ticks: { stepSize: this.xAxisStepSize, padding: 10 },
          grid: { display: this.xGridLines },
        },
        y: {
          beginAtZero: this.yAxisMin === undefined,
          min: this.yAxisMin,
          max: this.yAxisMax,
          stacked: this.isStacked,
          ticks: { stepSize: this.yAxisStepSize, padding: 10 },
          grid: { display: this.yGridLines },
        },
      },
    };
  }

  updateChart() {
    this.buildChart();
  }

  updatePatternOnly() {
    if (!this.chart?.chart) return;

    const chartInstance = this.chart.chart;

    chartInstance.data.datasets.forEach((dataset: any, index: number) => {
      const ds = this.config[index];

      if (this.showPattern && this.globalPatternType !== 'none') {
        const newPattern = this.createPattern(ds.color, this.globalPatternType);
        console.log(newPattern);

        dataset.backgroundColor = newPattern;
      } else {
        dataset.backgroundColor = ds.color;
      }
    });

    chartInstance.update(); // no mode
  }

  addData() {
    if (!this.newLabel || this.newActual === null || this.newTarget === null) return;

    this.labels.push(this.newLabel);
    this.config[0].data.push(this.newActual);
    this.config[1].data.push(this.newTarget);

    this.newLabel = '';
    this.newActual = null;
    this.newTarget = null;

    this.buildChart();
  }

  private generatePieColors(): string[] {
    const colors = [
      '#2196F3',
      '#FF5722',
      '#4CAF50',
      '#FFC107',
      '#9C27B0',
      '#00BCD4',
      '#E91E63',
      '#8BC34A',
    ];

    return this.labels.map((_, i) => colors[i % colors.length]);
  }

  private createPattern(
    color: string,
    type: DatasetConfig['patternType'] = 'crosshatch',
  ): CanvasPattern {
    const canvas = document.createElement('canvas');
    canvas.width = 6;
    canvas.height = 6;
    const ctx = canvas.getContext('2d')!;
    ctx.clearRect(0, 0, 6, 6);

    ctx.fillStyle = color + '22';
    ctx.fillRect(0, 0, 6, 6);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;

    switch (type) {
      case 'crosshatch':
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(6, 6);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(6, 0);
        ctx.lineTo(0, 6);
        ctx.stroke();
        break;
      case 'dots':
        ctx.beginPath();
        ctx.arc(3, 3, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        break;
      case 'dash':
        ctx.setLineDash([2, 2]);
        ctx.beginPath();
        ctx.moveTo(0, 3);
        ctx.lineTo(6, 3);
        ctx.stroke();
        ctx.setLineDash([]);
        break;
      case 'diamond':
        ctx.beginPath();
        ctx.moveTo(3, 0);
        ctx.lineTo(6, 3);
        ctx.lineTo(3, 6);
        ctx.lineTo(0, 3);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill();
        break;
    }

    return ctx.createPattern(canvas, 'repeat')!;
  }
}
