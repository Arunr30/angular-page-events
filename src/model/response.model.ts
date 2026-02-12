export interface DataSourceResponse {
  appArtifactType: string;
  appArtifactName: string;
  totalResults: number;
  drafts: Draft[];
  published: PublishedDataSource[];
}

export interface Draft {
  id: string;
  aggregateAppEntityName: string;
  draftJsonModel: string; 
  createdBy: string;
  createDate: string;
  enabled: boolean;
}

export interface PublishedDataSource {
  propertyDefinitions: any;
  id: string;
  type: string;
  group: string;
  serviceName: string;
  method: string;       
  dsName: string;
  wsTopicResult: string;
  pageName: string;
  dataSourceOwnerId: string;
  isMaster: boolean;
  appCode: string;
  createdBy: string;
  enabled: boolean;
  createDate: string;
  attributes: any;
  joinKey: any;
  finalResponseType: any;
  dataSourceOwnerType: any;
  shouldAutoResolveForeignKeys: boolean;
  identifier: string;
}

