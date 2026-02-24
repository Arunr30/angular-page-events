import { Routes } from '@angular/router';
import { ChartComponent } from './component/chart/chart';
import { ThresholdChartComponent } from './component/threshold/threshold';

export const routes: Routes = [
  { path: '', component: ChartComponent },
  { path: 'threshold', component: ThresholdChartComponent },
];
