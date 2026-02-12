import { Component, signal } from '@angular/core';
import { Page } from '../../../model/pges.model';
import { PageService } from '../../service/page-service';

@Component({
  selector: 'app-response-pagetwo',
  standalone: true,
  templateUrl: './response-pagetwo.html',
  styleUrl: './response-pagetwo.css',
})
export class ResponsePagetwo {

  pages = signal<Page[]>([]);
  loading = signal(true);

  constructor(private pageService: PageService) {
    this.loadPages();
  }

  private loadPages() {
    this.pageService.getPages().subscribe({
      next: (res) => {
        this.pages.set(res);
        this.loading.set(false);
        console.log('Pages API response', res);
      },
      error: (err) => {
        console.error('Pages API error', err);
        this.loading.set(false);
      }
    });
  }
}
