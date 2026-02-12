
export interface PageEventApi {
  id: string;
  pageName: string;
  eventProducerName: string;
  eventActionContainers: string;
  appCode: string;
  createdBy: string;
  enabled: boolean;
  createDate: string;
  attributes: any;
  identifier: string;
}

export interface PageEventsApiResponse {
  appArtifactType: string;
  appArtifactName: string;
  totalResults: number;
  drafts: any[];
  published: PageEventApi[];
}


export interface PageEvent {
  id: string;
  pageName: string;
  eventProducerName: string;
  eventActionContainers: EventActionContainer[];
  appCode: string;
  createdBy: string;
  enabled: boolean;
  createDate: string;
  attributes: any;
  identifier: string;
}

export interface EventActionContainer {
  id: string;
  eventType: string;
  subEventType: any;
  actions: Action[];
  paramBindings: ParamBinding[];
}

export interface Action {
  id?: string;
  actionType?: string;
  popupType?: string;
  popupControlName?: string;
  popupSettings?: any;
  isNewPopup?: boolean;
  canRaiseEventOnLoad?: boolean;
}

export interface ParamBinding {
  id: string;
  fieldName: string;
  datasourceName: string;
  param: string;
}
