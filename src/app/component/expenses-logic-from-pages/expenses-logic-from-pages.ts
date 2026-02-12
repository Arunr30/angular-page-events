import { Component, OnInit, signal } from '@angular/core';
import { Page } from '../../../model/pges.model';
import { PageService } from '../../service/page-service';

@Component({
  selector: 'app-expenses-logic-from-pages',
  templateUrl: './expenses-logic-from-pages.html',
})
export class ExpensesLogicFromPages implements OnInit {

  pages = signal<Page[]>([]);
  filteredPages = signal<Page[]>([]);

  constructor(private pageService: PageService) {}

  ngOnInit(): void {
    this.pageService.getPages().subscribe({
      next: (data) => {
        this.pages.set(data);

        const filtered = this.pages().filter(page =>
          page.name?.toLowerCase().includes('expense')
        );

        this.filteredPages.set(filtered);
      },
      error: (err) => {
        console.error('Error fetching pages:', err);
      }
    });
  }
}
