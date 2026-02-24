import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, Chart as ChartJS, registerables, ChartDataset } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule } from '@angular/forms';

ChartJS.register(...registerables, annotationPlugin);

interface Data {
  label: string;
  value: number;
  min: number;
  max: number;
}

@Component({
  selector: 'app-wave-form-component',
  standalone: true,
  imports: [BaseChartDirective, FormsModule],
  templateUrl: './wave-form-component.html',
  styleUrls: ['./wave-form-component.css'],
})
export class WaveFormComponent implements OnInit {
  public chartData!: ChartConfiguration<'bar' | 'line'>['data'];
  public chartOptions!: ChartConfiguration<'bar' | 'line'>['options'];

  public waveAmplitude: number = 0; // tension should be 0 to 1

  public data: Data[] = [
    { label: 'A', value: 30, min: 5, max: 35 },
    { label: 'B', value: 20, min: 10, max: 25 },
    { label: 'C', value: 15, min: 5, max: 20 },
    { label: 'D', value: 25, min: 15, max: 30 },
  ];

  ngOnInit(): void {
    this.buildChart();
  }

  onWaveChange(): void {
    this.buildChart();
  }

  private buildChart() {
    const labels = this.data.map((d) => d.label);

    const actualValues = this.data.map((d) => d.value);
    const predictedValues = this.data.map((d) => (d.min + d.max) / 2);

    const datasets: ChartDataset<'bar' | 'line', number[]>[] = [
      {
        type: 'bar',
        label: 'Actual',
        data: actualValues,
        backgroundColor: '#15803d',
        borderRadius: 8,
        barThickness: 50,
        order: 1,
        borderSkipped: false,
      },
      {
        type: 'line',
        label: 'Predicted',
        data: predictedValues,
        borderColor: '#f59e0b',
        backgroundColor: 'transparent',
        borderWidth: 2,
        tension: this.waveAmplitude, // controlled by slider
        fill: false,
        pointRadius: 4,
        pointBackgroundColor: '#f59e0b',
        order: 2,
      },
    ];

    this.chartData = { labels, datasets };

    const annotations: any = {};

    this.data.forEach((d, index) => {
      annotations[`min${index}`] = {
        type: 'line',
        xMin: index - 0.4,
        xMax: index + 0.4,
        yMin: d.min,
        yMax: d.min,
        borderColor: '#16a34a',
        borderDash: [4, 4],
        borderWidth: 2,
      };

      annotations[`max${index}`] = {
        type: 'line',
        xMin: index - 0.4,
        xMax: index + 0.4,
        yMin: d.max,
        yMax: d.max,
        borderColor: '#dc2626',
        borderDash: [4, 4],
        borderWidth: 2,
      };
    });

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: 'top' },
        annotation: { annotations },
      },
      scales: {
        x: {
          grid: { display: false },
        },
        y: {
          beginAtZero: true,
        },
      },
    };
  }
}
