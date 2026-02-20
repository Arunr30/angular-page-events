import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PageEvent, PageEventsApiResponse, PageEventApi } from '../../model/page.event.model';

@Injectable({
  providedIn: 'root',
})
export class PageEventsService {
  private apiUrl =
    'http://192.168.1.123:4284/devum/pageEventsContainers/draftsByAggregateName/Global_dashboard';

  constructor(private http: HttpClient) {}

  getPageEvents(): Observable<PageEvent[]> {
    return this.http.get<PageEventsApiResponse>(this.apiUrl).pipe(
      map((response) =>
        response.published.map((event: PageEventApi) => ({
          ...event,
          eventActionContainers: this.parseContainers(event.eventActionContainers),
        })),
      ),
    );
  }

  private parseContainers(value: string) {
    try {
      return JSON.parse(value);
    } catch {
      return [];
    }
  }
}
