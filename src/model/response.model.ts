// src/app/model/data-source-instance.model.ts

export interface DataSourceResponse {
  appArtifactType: string;
  appArtifactName: string;
  totalResults: number;
  drafts: DraftDataSource[];
  published: PublishedDataSource[];
  fKeyFields?: string;
}

export interface DraftDataSource {
  id: string;
  appEntityId?: string;
  aggregateAppEntityName: string;
  draftJsonModel: DraftJsonModel; // parsed object instead of raw string
  dsName?: string; // optional convenience field
  wsTopicResult?: string;
  pageName?: string;
  dataSourceOwnerId?: string;
  isMaster?: boolean;
  appCode?: string;
  createdBy?: string;
  enabled?: boolean;
  createDate?: string;
  attributes?: Record<string, any>;
  joinKey?: any;
  finalResponseType?: any;
  dataSourceOwnerType?: any;
  shouldAutoResolveForeignKeys?: boolean;
  identifier?: string;
}

export interface DraftJsonModel {
  id: string;
  type: string;
  group: string;
  serviceName?: string;
  method: MethodDefinition;
  returningResult: ReturningField[];
  groupField1?: string | null;
  groupField2?: string | null;
  aggregateField?: string | null;
  aggregateFunction?: string | null;
  dateField?: string | null;
  isStartDateIncluded?: boolean | null;
  isEndDateIncluded?: boolean | null;
  canAggregateTime?: boolean;
  canAggregateSize?: boolean | null;
  returningSchemaName?: string;
  wsLogTopic?: string;
  isOnRequestMview?: boolean;
  filterCondition?: string;
}

export interface PublishedDataSource {
  propertyDefinitions?: any; // optional
  id: string;
  type: string;
  group: string;
  serviceName: string;
  method: MethodDefinition; // parsed JSON object
  dsName: string;
  wsTopicResult: string;
  pageName: string;
  dataSourceOwnerId: string;
  isMaster: boolean;
  appCode: string;
  createdBy: string;
  enabled: boolean;
  createDate: string;
  attributes: Record<string, any>;
  joinKey: any;
  finalResponseType: any;
  dataSourceOwnerType: any;
  shouldAutoResolveForeignKeys: boolean;
  identifier: string;
}

export interface MethodDefinition {
  methodName: string;
  params: MethodParam[];
  methodType: string;
  returningResult: ReturningField[];
}

export interface MethodParam {
  name: string;
  type: string;
  bindingType?: number;
  operator?: string;
  isOptional?: boolean;
  isRequired?: boolean;
  canAccumalate?: boolean;
  isAttributeProperty?: boolean;
  isArray?: boolean | null;
  dsFieldName?: string;
  uniqueEventId?: { key: string };
}

export interface ReturningField {
  name: string;
  type: string;
  props: FieldProps;
  valueOpt?: any[];
  isDisable?: boolean;
}

export interface FieldProps {
  isOptional: boolean;
  isArray: boolean;
  isForeignKey: boolean;
  foreignSchema?: string | string[];
  foreignField?: string | string[];
  reducer?: string | null;
}
