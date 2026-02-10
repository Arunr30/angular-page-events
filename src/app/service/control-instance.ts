import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ControlInstanceResponse, ControlInstance } from '../../model/control.instance.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ControlInstanceService {
  private url = "https://try.den.devum.com/devum/controlInstances/draftsByAggregateName/test_page_5";

  constructor(private http: HttpClient) {}

  getControlInstances(): Observable<ControlInstance[]> {
    return this.http.get<ControlInstanceResponse>(this.url)
      .pipe(
        map(res => res.published) 
      );
  }
}
