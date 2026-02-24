import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, forkJoin, of } from 'rxjs';

import { ApiService } from '../../service/api-service';
import { PageEventsService } from '../../service/page-events';
import { ControlInstanceService } from '../../service/control-instance';

interface DsUsage {
  dsName: string;
  dataSourceOwnerId?: string;
  mappedFields: string[];
}

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './TestPageComponent.html',
  styleUrls: ['./TestPageComponent.css'],
})
export class TestPageComponent implements OnInit {
  usageList = signal<DsUsage[]>([]);
  loading = signal(true);

  constructor(
    private dsService: ApiService,
    private pageEventsService: PageEventsService,
    private controlInstanceService: ControlInstanceService,
  ) {}

  ngOnInit(): void {
    this.loadAll();
  }

  private loadAll() {
    forkJoin({
      dataSources: this.dsService.getData().pipe(
        catchError((err) => {
          console.error('DS error', err);
          return of([]);
        }),
      ),
      pageEvents: this.pageEventsService.getPageEvents().pipe(
        catchError((err) => {
          console.error('Page Events error', err);
          return of([]);
        }),
      ),
      controlInstances: this.controlInstanceService.getControlInstances().pipe(
        catchError((err) => {
          console.error('Control Instances error', err);
          return of([]);
        }),
      ),
    }).subscribe({
      next: ({ dataSources, pageEvents, controlInstances }: any) => {
        console.log('DataSources:', dataSources);
        console.log('PageEvents:', pageEvents);
        console.log('ControlInstances:', controlInstances);

        this.buildUsage(dataSources, pageEvents, controlInstances);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.loading.set(false);
      },
    });
  }

  private buildUsage(dataSources: any, pageEvents: any, controlInstances: any) {
    const result: DsUsage[] = [];

    const filteredDS = [
      ...(dataSources?.published || []).filter((d: any) => d.type !== 'MView'),
      ...(dataSources?.drafts || []).filter((d: any) => d.type !== 'MView'),
    ];

    // Map dsName → dataSourceOwnerId
    const dsOwnerMap = new Map<string, string>();
    filteredDS.forEach((item: any) => {
      if (item.dsName && item.dataSourceOwnerId && !dsOwnerMap.has(item.dsName)) {
        dsOwnerMap.set(item.dsName, item.dataSourceOwnerId);
      }
    });

    const dsNamesSet = new Set<string>();
    filteredDS.forEach((item: any) => {
      if (item.dsName) {
        dsNamesSet.add(item.dsName);
      }
    });

    const dataSourcesStr = JSON.stringify(filteredDS);
    const pageEventsStr = JSON.stringify(pageEvents || {});
    const controlInstancesStr = JSON.stringify(controlInstances || {});

    dsNamesSet.forEach((dsName) => {
      const fieldsSet = new Set<string>();
      const fieldRegex = new RegExp(`${dsName}\\.([a-zA-Z0-9_\\-]+)`, 'g');

      let match;
      while ((match = fieldRegex.exec(dataSourcesStr)) !== null) {
        fieldsSet.add(match[1]);
      }
      while ((match = fieldRegex.exec(pageEventsStr)) !== null) {
        fieldsSet.add(match[1]);
      }
      while ((match = fieldRegex.exec(controlInstancesStr)) !== null) {
        fieldsSet.add(match[1]);
      }

      result.push({
        dsName,
        dataSourceOwnerId: dsOwnerMap.get(dsName),
        mappedFields: Array.from(fieldsSet),
      });
    });

    this.usageList.set(result);
  }
}
