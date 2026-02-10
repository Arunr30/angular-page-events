import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
  PageEvent,
  EventActionContainer,
  PageEventsApiResponse,
} from '../../model/page.event.model';

@Injectable({
  providedIn: 'root',
})
export class PageEvents {
  private apiUrl =
    'https://try.den.devum.com/devum/pageEventsContainers/draftsByAggregateName/test_page_5';

  constructor(private http: HttpClient) {}

  getPageEvents(): Observable<PageEvent[]> {
    return this.http
      .get<PageEventsApiResponse>(this.apiUrl)
      .pipe(
        map(res =>
          res.published.map(event => ({
            ...event,
            eventActionContainers: JSON.parse(
              event.eventActionContainers as string
            ) as EventActionContainer[],
          }))
        )
      );
  }
}
