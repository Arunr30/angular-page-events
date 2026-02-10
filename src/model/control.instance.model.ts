export interface ControlInstanceResponse {
  appArtifactType: string;
  appArtifactName: string;
  totalResults: number;
  drafts: any[]; // empty for now
  published: ControlInstance[];
}

export interface ControlInstance {
  id: string;
  instanceId: string;
  parentInstanceId: string | null;
  ctrlType: string;
  parentSectionIndex: number;
  controlName: string;
  pageName: string;
  selectedDataSourceServiceInstanceId: string | null;
  dsDependentControlInstanceId: string | null;
  allAttributeValues: string; // JSON string
  propertyDefinitions: string;
  controlConditionGroup: string;
  appCode: string;
  createdBy: string;
  enabled: boolean;
  createDate: string;
  attributes: Record<string, any>;
  name: string;
  joinStrategy: string | null;
  sequenceNo: number;
  identifier: string;
}
