import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Page } from '../../model/pges.model';

@Injectable({
  providedIn: 'root',
})
export class PageService {

  private apiUrl = "https://try.den.devum.com/devum/pages"
  constructor(private http: HttpClient) {}

  getPages(): Observable<Page[]> {
    return this.http.get<Page[]> (this.apiUrl)
  }
  
}
