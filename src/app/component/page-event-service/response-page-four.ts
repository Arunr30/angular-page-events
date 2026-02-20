import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventActionContainer, PageEvent } from '../../../model/page.event.model';
import {PageEventsService } from '../../service/page-events';

@Component({
  selector: 'app-response-page-four',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './response-page-four.html',
  styleUrl: './response-page-four.css',
})
export class ResponsePageFour {

  pageEvents = signal<PageEvent[]>([]);
  loading = signal(true);
  error = signal('');

  constructor(private pageEventsService: PageEventsService) {
    this.loadPageEvents();
  }

  private loadPageEvents() {
    this.pageEventsService.getPageEvents().subscribe({
      next: (events) => {
        this.pageEvents.set(events);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.error.set('Failed to load page events');
        this.loading.set(false);
      },
    });
  }

  getContainers(containers: EventActionContainer[] | null | undefined) {
    return containers ?? [];
  }
}
