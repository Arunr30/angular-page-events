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
