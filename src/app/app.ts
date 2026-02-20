import { Component, signal } from '@angular/core';
import { TestPageComponent } from './component/data-source/TestPageComponent';
import { Home } from './component/home/home';
import { ResponsePagetwo } from './component/pages-data/response-pagetwo';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Home, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('auth-end-point');
}
