import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, forkJoin, of } from 'rxjs';

import { ApiService } from '../../service/api-service';
import { PageEventsService } from '../../service/page-events';
import { ControlInstanceService } from '../../service/control-instance';
import { ControlInstanceResponse } from '../../../model/control.instance.model';
import { PageEventsApiResponse } from '../../../model/page.event.model';
import { DataSourceResponse } from '../../../model/response.model';

interface DsUsage {
  dsName: string;
  dataSourceOwnerId?: string;
  controlName?: string;
  parentInstanceId?: string;
  mappedFields: string[];
  hasMapping: boolean;
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

  private loadAll(): void {
    forkJoin({
      dataSources: this.dsService.getData().pipe(
        catchError((err) => {
          console.error('DS error', err);
          return of(null);
        }),
      ),
      pageEvents: this.pageEventsService.getPageEvents().pipe(
        catchError((err) => {
          console.error('Page Events error', err);
          return of(null);
        }),
      ),
      controlInstances: this.controlInstanceService.getControlInstances().pipe(
        catchError((err) => {
          console.error('Control Instances error', err);
          return of(null);
        }),
      ),
    }).subscribe({
      next: ({ dataSources, pageEvents, controlInstances }) => {
        this.buildUsage(
          dataSources as DataSourceResponse,
          pageEvents as PageEventsApiResponse,
          controlInstances as ControlInstanceResponse,
        );
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading data:', err);
        this.loading.set(false);
      },
    });
  }

  private buildUsage(
    dataSources: DataSourceResponse,
    pageEvents: PageEventsApiResponse,
    controlInstances: ControlInstanceResponse,
  ): void {
    const result: DsUsage[] = [];

    const publishedDS = dataSources?.published ?? [];
    const draftDS = dataSources?.drafts ?? [];

    const allDSItems = [...publishedDS, ...draftDS].filter((d: any) => d?.type !== 'MView');

    const instanceIdMap = new Map<string, { controlName?: string; parentInstanceId?: string }>();

    const drafts = controlInstances?.drafts ?? [];
    const published = controlInstances?.published ?? [];

    // Parse drafts
    for (const draft of drafts) {
      if (!draft?.draftJsonModel) continue;

      try {
        const parsed = JSON.parse(draft.draftJsonModel);
        if (parsed?.instanceId) {
          instanceIdMap.set(String(parsed.instanceId), {
            controlName: parsed.controlName,
            parentInstanceId: parsed.parentInstanceId,
          });
        }
      } catch (e) {
        console.warn('Invalid draftJsonModel', e);
      }
    }

    // Published controls
    for (const pub of published) {
      if (pub?.instanceId) {
        instanceIdMap.set(String(pub.instanceId), {
          controlName: pub.controlName ?? undefined,
          parentInstanceId: pub.parentInstanceId ?? undefined,
        });
      }
    }

    const pageStr = JSON.stringify(pageEvents ?? {});
    const ctrlStr = JSON.stringify(controlInstances ?? {});

    for (const dsItem of allDSItems) {
      const dsName = dsItem?.dsName;
      if (!dsName) continue;

      const ownerId = dsItem?.dataSourceOwnerId ? String(dsItem.dataSourceOwnerId) : undefined;

      const fieldsSet = new Set<string>();
      const dsStr = JSON.stringify(dsItem);
      const regex = new RegExp(`${dsName}\\.([a-zA-Z0-9_\\-]+)`, 'g');

      let match: RegExpExecArray | null;

      while ((match = regex.exec(dsStr))) fieldsSet.add(match[1]);
      while ((match = regex.exec(pageStr))) fieldsSet.add(match[1]);
      while ((match = regex.exec(ctrlStr))) fieldsSet.add(match[1]);

      const controlInfo = ownerId ? instanceIdMap.get(ownerId) : undefined;

      if (ownerId && !controlInfo) {
        console.warn(`No control match for ownerId ${ownerId} (DS: ${dsName})`);
      }

      result.push({
        dsName,
        dataSourceOwnerId: ownerId,
        controlName: controlInfo?.controlName,
        parentInstanceId: controlInfo?.parentInstanceId,
        mappedFields: Array.from(fieldsSet),
        hasMapping: !!controlInfo || fieldsSet.size > 0,
      });
    }

    result.sort((a, b) => a.mappedFields.length - b.mappedFields.length);

    this.usageList.set(result);
  }
}
