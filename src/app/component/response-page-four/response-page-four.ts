import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventActionContainer, PageEvent } from '../../../model/page.event.model';
import { PageEvents } from '../../service/page-events';

@Component({
  selector: 'app-response-page-four',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './response-page-four.html',
  styleUrl: './response-page-four.css',
})
export class ResponsePageFour implements OnInit {
  pageEvents: PageEvent[] = [];
  loading = true;
  error = '';

  constructor(private pageEventsService: PageEvents) {}

  ngOnInit(): void {
    this.pageEventsService.getPageEvents().subscribe({
      next: events => {
        this.pageEvents = events;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.error = 'Failed to load page events';
        this.loading = false;
      },
    });
  }

  getContainers(
    containers: string | EventActionContainer[]
  ): EventActionContainer[] {
    return Array.isArray(containers) ? containers : [];
  }
}
