import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataSourceResponse, PublishedDataSource } from '../../model/response.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private url =
    'http://192.168.1.123:4284/devum/dataSourceServiceInstances/draftsByAggregateName/Global_dashboard';

  constructor(private http: HttpClient) {}

  getData(): Observable<PublishedDataSource[]> {
    return this.http.get<DataSourceResponse>(this.url).pipe(map((res) => res.published));
  }
}

// dataSourceServiceInstances
