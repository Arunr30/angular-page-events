import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PublishedDataSource } from '../../../model/response.model';
import { ApiService } from '../../service/api-service';

@Component({
  selector: 'app-test-page',
  templateUrl: './TestPageComponent.html',
  styleUrls: ['./TestPageComponent.css'],
})
export class TestPageComponent implements OnInit {

  published = signal<PublishedDataSource[]>([]);
  filtered = signal<PublishedDataSource[]>([]);
  loading = signal(true);

  constructor(private ds: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.ds.getDrafts().subscribe({
      next: (res) => {
        this.published.set(res);

        // Check query param to filter DS data
        this.route.queryParams.subscribe(params => {
          if (params['filter'] === 'ds_data') {
            this.showDSData();
          } else {
            this.filtered.set(res);
          }
        });

        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }

  // Filter all items related to expenses
  showDSData() {
    const allExpenses = this.published().filter(item =>
      item.dsName?.includes('expenses') ||
      JSON.stringify(item.propertyDefinitions).includes('expenses')
    );
    this.filtered.set(allExpenses);
  }

  // Optional: manual filter by dsName
  filterByDsName(dsName: string) {
    this.filtered.set(
      this.published().filter(item => item.dsName === dsName)
    );
  }

  resetFilter() {
    this.filtered.set(this.published());
  }
}
