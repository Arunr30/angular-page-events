import { Component, OnInit, signal } from '@angular/core';
import { Page } from '../../../model/pges.model';
import { ControlInstance } from '../../../model/control.instance.model';
import { PageEvent } from '../../../model/page.event.model';

import { PageService } from '../../service/page-service';
import { ControlInstanceService } from '../../service/control-instance';
import { PageEventsService } from '../../service/page-events';

@Component({
  selector: 'app-expenses-parent',
  templateUrl: './expenses-parent.html',
})
export class ExpensesParent implements OnInit {

  filteredPages = signal<Page[]>([]);
  filteredControls = signal<ControlInstance[]>([]);
  filteredEvents = signal<PageEvent[]>([]);
  loading = signal(true);

  constructor(
    private pageService: PageService,
    private controlService: ControlInstanceService,
    private eventService: PageEventsService
  ) {}

  

  ngOnInit(): void {
    console.log("EXPENSES PARENT LOADED");
    this.loadExpensesData();
  }

  private loadExpensesData() {
    // pages
    this.pageService.getPages().subscribe({
      next: (pages: Page[]) => {
        const expensePages = pages.filter(page =>
          page.name?.toLowerCase().includes('expense')
        );

        this.filteredPages.set(expensePages);
      },
      error: (err) => console.error(err)
    });

    // control instances
    this.controlService.getControlInstances().subscribe({
      next: (res: any) => {

        const controls: ControlInstance[] = res.published ?? res;

        const expenseControls = controls.filter(control => {
          try {
            const parsed = JSON.parse(control.propertyDefinitions || '[]');

            return parsed.some((prop: any) =>
              prop.dsPropertyName?.toLowerCase().includes('expense')
            );
          } catch {
            return false;
          }
        });

        this.filteredControls.set(expenseControls);
      },
      error: (err) => console.error(err)
    });


    // page events
    this.eventService.getPageEvents().subscribe({
      next: (events: PageEvent[]) => {
         console.log("EVENTS RECEIVED", events);

        // const expenseEvents = events.filter(event =>
        //   event.eventActionContainers &&
        //   event.eventActionContainers.some(container =>
        //     container.paramBindings &&
        //     container.paramBindings.some(binding =>
        //       binding.datasourceName &&
        //       binding.datasourceName.toLowerCase().includes('expense')
        //     )
        //   )
        // );


        const expenseEvents = events.filter(event =>
          event.eventActionContainers
            ?.flatMap(container => container.paramBindings || [])
            .some(binding =>
              binding.datasourceName?.toLowerCase().includes('expense')
            )
        );

        this.filteredEvents.set(expenseEvents);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });

  }
}

