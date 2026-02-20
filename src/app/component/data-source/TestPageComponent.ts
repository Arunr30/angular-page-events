import { Component, OnInit, signal } from '@angular/core';
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

  constructor(private ds: ApiService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.ds.getData().subscribe({
      next: (res) => {
        this.published.set(res);
        this.filtered.set(res);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      },
    });
  }

  getParsedMethod(item: PublishedDataSource): any {
    if (!item?.method) return null;
    // on the backend we are getting the data in a sring format, then we are parsing that string into array of objects.
    try {
      return JSON.parse(item.method);
    } catch (e) {
      console.error('Invalid method JSON', e);
      return null;
    }
  }

  getMappedFields(item: PublishedDataSource): string[] {
    const parsed = this.getParsedMethod(item);

    if (!parsed?.params) return [];
    return parsed.params.filter((p: any) => p.dsFieldName).map((p: any) => p.dsFieldName);
  }
}
