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
      dataSources: this.dsService.getData().pipe(catchError(() => of(null))),
      pageEvents: this.pageEventsService.getPageEvents().pipe(catchError(() => of(null))),
      controlInstances: this.controlInstanceService
        .getControlInstances()
        .pipe(catchError(() => of(null))),
    }).subscribe({
      next: ({ dataSources, pageEvents, controlInstances }) => {
        this.processData(
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

  private prepareInstanceIdMap(
    controlInstances: ControlInstanceResponse,
  ): Map<string, ControlInfo[]> {
    const instanceMap = new Map<string, ControlInfo[]>();

    // Safely get drafts and published arrays
    const drafts = controlInstances?.drafts ?? [];
    const published = controlInstances?.published ?? [];

    // Helper to add control to map
    const addControl = (control: any, isDraft = false) => {
      try {
        const parsedControl = isDraft ? JSON.parse(control.draftJsonModel) : control;

        if (!parsedControl?.instanceId) return; // skip if no instanceId

        const key = String(parsedControl.instanceId);

        // Initialize array if not exists
        if (!instanceMap.has(key)) {
          instanceMap.set(key, []);
        }

        // Push control info
        instanceMap.get(key)!.push({
          controlName: parsedControl.controlName,
          parentInstanceId: parsedControl.parentInstanceId,
        });
      } catch (err) {
        if (isDraft) console.warn('Invalid draft JSON:', err);
      }
    };

    // Process all drafts
    drafts.forEach((draft) => {
      if (draft?.draftJsonModel) addControl(draft, true);
    });

    // Process all published
    published.forEach((pub) => addControl(pub));

    return instanceMap;
  }

  private extractMappedFields(
    dsItem: any,
    pageEvents: any,
    controlInstances: any,
    dsName: string,
  ): string[] {
    const fieldsSet = new Set<string>();
    const dsStr = JSON.stringify(dsItem);
    const pageStr = JSON.stringify(pageEvents ?? {});
    const ctrlStr = JSON.stringify(controlInstances ?? {});
    const regex = new RegExp(`\\b${dsName}\\.([a-zA-Z0-9_\\-]+)\\b`, 'g');

    let match: RegExpExecArray | null;
    while ((match = regex.exec(dsStr))) fieldsSet.add(match[1]);
    while ((match = regex.exec(pageStr))) fieldsSet.add(match[1]);
    while ((match = regex.exec(ctrlStr))) fieldsSet.add(match[1]);

    return Array.from(fieldsSet);
  }

  private buildFlatResult(
    dataSources: DataSourceResponse,
    pageEvents: PageEventsApiResponse,
    controlInstances: ControlInstanceResponse,
    instanceIdMap: Map<string, ControlInfo[]>,
  ): { all: DsUsage[]; unused: UnusedDS[] } {
    const publishedDS = dataSources?.published ?? [];
    const draftDS = dataSources?.drafts ?? [];
    const allDSItems = [...publishedDS, ...draftDS].filter((d: any) => d?.type !== 'MView');

    const all: DsUsage[] = [];
    const unused: UnusedDS[] = [];

    for (const dsItem of allDSItems) {
      const dsName = dsItem?.dsName;
      if (!dsName) continue;

      const ownerId = dsItem?.dataSourceOwnerId ? String(dsItem.dataSourceOwnerId) : 'NO_OWNER';
      const mappedFields = this.extractMappedFields(dsItem, pageEvents, controlInstances, dsName);
      const controls = instanceIdMap.get(ownerId) ?? [];

      const dsUsage: DsUsage = {
        dsName,
        dataSourceOwnerId: ownerId,
        controls,
        mappedFields,
        hasMapping: controls.length > 0 || mappedFields.length > 0,
      };

      all.push(dsUsage);

      if (controls.length === 0 && mappedFields.length === 0) {
        unused.push({ dsName, ownerId });
      }
    }

    return { all, unused };
  }

  private sortByPriority(result: DsUsage[]): DsUsage[] {
    return result.sort((a, b) => {
      const getPriority = (item: DsUsage) => {
        const hasControls = item.controls.length > 0;
        const hasMapped = item.mappedFields.length > 0;
        if (!hasControls && !hasMapped) return 1; // Completely unused
        if (hasControls && !hasMapped) return 2; // Used but no mapping
        return 3; // Used and mapped
      };
      return getPriority(a) - getPriority(b);
    });
  }
  private groupByOwner(Owner: DsUsage[]): OwnerGroup[] {
    const ownerMap = new Map<string, DsUsage[]>();

    for (const item of Owner) {
      const ownerId = item.dataSourceOwnerId ?? 'NO_OWNER';

      if (!ownerMap.has(ownerId)) {
        ownerMap.set(ownerId, []);
      }

      ownerMap.get(ownerId)!.push(item);
    }
    const result: OwnerGroup[] = [];
    for (const [ownerId, items] of ownerMap) {
      result.push({ ownerId, items });
    }

    return result;
  }

  private processData(
    dataSources: DataSourceResponse,
    pageEvents: PageEventsApiResponse,
    controlInstances: ControlInstanceResponse,
  ): void {
    const instanceIdMap = this.prepareInstanceIdMap(controlInstances);
    const { all, unused } = this.buildFlatResult(
      dataSources,
      pageEvents,
      controlInstances,
      instanceIdMap,
    );

    const sortedAll = this.sortByPriority(all);
    this.usageList.set(this.groupByOwner(sortedAll));
    this.unusedList.set(unused);

    // Optional console table for debugging
    console.table(
      sortedAll.map((r) => ({
        ds: r.dsName,
        controls: r.controls.length,
        mapped: r.mappedFields.length,
      })),
    );

    console.table(
      unused.map((r, idx) => ({
        '#': idx + 1,
        ownerId: r.ownerId,
        dsName: r.dsName,
      })),
    );
  }
}

// preparing instance id,
//
