import { Component, OnInit, signal } from '@angular/core';
import { Page } from '../../../model/pges.model';
import { ControlInstance } from '../../../model/control.instance.model';
import { PageEvent } from '../../../model/page.event.model';

import { PageService } from '../../service/page-service';
import { ControlInstanceService } from '../../service/control-instance';
import { PageEventsService } from '../../service/page-events';

import { forkJoin, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-expenses-parent',
  templateUrl: './expenses-parent.html',
})
export class ExpensesParent {
  filteredPages = signal<Page[]>([]);
  filteredControls = signal<ControlInstance[]>([]);
  filteredEvents = signal<PageEvent[]>([]);
  loading = signal(true);

  constructor(
    private pageService: PageService,
    private controlService: ControlInstanceService,
    private eventService: PageEventsService,
  ) {}

  // ngOnInit(): void {
  //   console.log('EXPENSES PARENT LOADED');
  //   this.loadExpensesData();
  // }

  // private loadExpensesData(): void {
  //   this.loading.set(true);

  //   forkJoin({
  //     pages: this.pageService.getPages().pipe(
  //       // if one api fails, fork join fails completely.
  //       catchError((err) => {
  //         console.error('Pages API error:', err);
  //         return of([]);
  //       }),
  //     ),

  //     controls: this.controlService.getControlInstances().pipe(
  //       catchError((err) => {
  //         console.error('Controls API error:', err);
  //         return of([]);
  //       }),
  //     ),

  //     events: this.eventService.getPageEvents().pipe(
  //       catchError((err) => {
  //         console.error('Events API error:', err);
  //         return of([]);
  //       }),
  //     ),
  //   })
  //     .pipe(finalize(() => this.loading.set(false)))
  //     .subscribe(({ pages, controls, events }) => {
  //       //  Filter Pages
  //       const expensePages = pages.filter((page) => page.name?.toLowerCase().includes('expense'));
  //       this.filteredPages.set(expensePages);

  //       //  Filter Controls
  //       const controlsArray: ControlInstance[] = (controls as any).published ?? controls;

  //       const expenseControls = controlsArray.filter((control) => {
  //         try {
  //           const parsed = JSON.parse(control.propertyDefinitions || '[]');

  //           return parsed.some((prop: any) =>
  //             prop.dsPropertyName?.toLowerCase().includes('expense'),
  //           );
  //         } catch {
  //           return false;
  //         }
  //       });

  //       this.filteredControls.set(expenseControls);

  //       //  Filter Events
  //       const expenseEvents = events.filter((event) =>
  //         event.eventActionContainers
  //           ?.flatMap((container) => container.paramBindings || [])
  //           .some((binding) => binding.datasourceName?.toLowerCase().includes('expense')),
  //       );

  //       this.filteredEvents.set(expenseEvents);
  //     });
  // }
}
