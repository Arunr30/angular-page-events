import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../model/pges.model';

@Injectable({
  providedIn: 'root',
})
export class PageService {
  private apiUrl = 'http://192.168.1.123:4284/devum/pages';
  constructor(private http: HttpClient) {}

  getPages(): Observable<Page[]> {
    return this.http.get<Page[]>(this.apiUrl);
  }
}

// pageEventsContainers
