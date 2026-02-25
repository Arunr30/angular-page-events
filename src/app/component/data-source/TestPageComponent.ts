import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { catchError, forkJoin, of } from 'rxjs';

import { ApiService } from '../../service/api-service';
import { PageEventsService } from '../../service/page-events';
import { ControlInstanceService } from '../../service/control-instance';
import { ControlInstanceResponse } from '../../../model/control.instance.model';
import { PageEventsApiResponse } from '../../../model/page.event.model';
import { DataSourceResponse } from '../../../model/response.model';

interface ControlInfo {
  controlName?: string;
  parentInstanceId?: string;
}

interface DsUsage {
  dsName: string;
  dataSourceOwnerId?: string;
  controls: ControlInfo[];
  mappedFields: string[];
  hasMapping: boolean;
}

interface OwnerGroup {
  ownerId: string;
  items: DsUsage[];
}

// New type for completely unused DS
interface UnusedDS {
  dsName: string;
  ownerId: string;
}

@Component({
  selector: 'app-test-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './TestPageComponent.html',
  styleUrls: ['./TestPageComponent.css'],
})
export class TestPageComponent implements OnInit {
  usageList = signal<OwnerGroup[]>([]);
  unusedList = signal<UnusedDS[]>([]);
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
    const flatResult: DsUsage[] = [];
    const unusedDS: UnusedDS[] = [];

    const publishedDS = dataSources?.published ?? [];
    const draftDS = dataSources?.drafts ?? [];
    const allDSItems = [...publishedDS, ...draftDS].filter((d: any) => d?.type !== 'MView');

    const instanceIdMap = new Map<string, ControlInfo[]>();
    const draftsFromCtrlIns = controlInstances?.drafts ?? [];
    const publishedFromIns = controlInstances?.published ?? [];

    // Build instanceIdMap from control instances
    for (const draft of draftsFromCtrlIns) {
      if (!draft?.draftJsonModel) continue;

      try {
        const parsed = JSON.parse(draft.draftJsonModel);
        if (parsed?.instanceId) {
          const key = String(parsed.instanceId);
          if (!instanceIdMap.has(key)) instanceIdMap.set(key, []);
          instanceIdMap.get(key)!.push({
            controlName: parsed.controlName,
            parentInstanceId: parsed.parentInstanceId,
          });
        }
      } catch (e) {
        console.warn('Invalid draftJsonModel', e);
      }
    }

    for (const pub of publishedFromIns) {
      if (!pub?.instanceId) continue;
      const key = String(pub.instanceId);
      if (!instanceIdMap.has(key)) instanceIdMap.set(key, []);
      instanceIdMap.get(key)!.push({
        controlName: pub.controlName ?? undefined,
        parentInstanceId: pub.parentInstanceId ?? undefined,
      });
    }

    const pageStr = JSON.stringify(pageEvents ?? {});
    const ctrlStr = JSON.stringify(controlInstances ?? {});

    for (const dsItem of allDSItems) {
      const dsName = dsItem?.dsName;
      if (!dsName) continue;

      const ownerId = dsItem?.dataSourceOwnerId ? String(dsItem.dataSourceOwnerId) : 'NO_OWNER';

      const fieldsSet = new Set<string>();
      const dsStr = JSON.stringify(dsItem);
      const regex = new RegExp(`\\b${dsName}\\.([a-zA-Z0-9_\\-]+)\\b`, 'g');

      let match: RegExpExecArray | null;
      while ((match = regex.exec(dsStr))) fieldsSet.add(match[1]);
      while ((match = regex.exec(pageStr))) fieldsSet.add(match[1]);
      while ((match = regex.exec(ctrlStr))) fieldsSet.add(match[1]);

      const matchedControls = instanceIdMap.get(ownerId) ?? [];

      const dsUsage: DsUsage = {
        dsName,
        dataSourceOwnerId: ownerId,
        controls: matchedControls,
        mappedFields: Array.from(fieldsSet),
        hasMapping: matchedControls.length > 0 || fieldsSet.size > 0,
      };

      if (matchedControls.length === 0 && fieldsSet.size === 0) {
        unusedDS.push({ ownerId, dsName });
      } else {
        flatResult.push(dsUsage);
      }
    }

    // Priority-wise sorting for active DS
    flatResult.sort((a, b) => {
      const getPriority = (item: DsUsage) => {
        const hasControls = item.controls.length > 0;
        const hasMappedFields = item.mappedFields.length > 0;

        if (!hasControls && !hasMappedFields) return 1; // Not used (we already pushed to unusedDS)
        if (hasControls && !hasMappedFields) return 2; // Used but no mapped
        return 3; // Used and mapped
      };
      return getPriority(a) - getPriority(b);
    });

    console.table(
      flatResult.map((r) => ({
        ds: r.dsName,
        controls: r.controls.length,
        mapped: r.mappedFields.length,
      })),
    );

    // Group by owner for active DS
    const ownerMap = new Map<string, DsUsage[]>();
    for (const item of flatResult) {
      const key = item.dataSourceOwnerId ?? 'NO_OWNER';
      if (!ownerMap.has(key)) ownerMap.set(key, []);
      ownerMap.get(key)!.push(item);
    }

    const groupedResult: OwnerGroup[] = Array.from(ownerMap.entries()).map(([ownerId, items]) => ({
      ownerId,
      items,
    }));

    this.usageList.set(groupedResult);
    this.unusedList.set(unusedDS);
  }
}
