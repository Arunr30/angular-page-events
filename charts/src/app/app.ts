import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChartComponent } from './component/chart/chart';
import { WaveFormComponent } from './component/wave-form-component/wave-form-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChartComponent, WaveFormComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('chart-task');
}
