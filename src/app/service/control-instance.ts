import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ControlInstanceResponse, ControlInstance } from '../../model/control.instance.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ControlInstanceService {
  private url =
    'http://192.168.1.123:4284/devum/controlInstances/draftsByAggregateName/Global_dashboard';

  constructor(private http: HttpClient) {}

  getControlInstances(): Observable<ControlInstance[]> {
    return this.http.get<ControlInstanceResponse>(this.url).pipe(map((res) => res.published));
  }
}

//controlInstances
