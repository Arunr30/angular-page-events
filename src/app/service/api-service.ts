import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataSourceResponse, PublishedDataSource } from '../../model/response.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private url = "https://try.den.devum.com/devum/dataSourceServiceInstances/draftsByAggregateName/test_page_5";

  constructor(private http: HttpClient){}

  getDrafts(): Observable<PublishedDataSource[]> {
    return this.http.get<DataSourceResponse>(this.url)
     .pipe(map(res => res.published));
    
  }

  
}
