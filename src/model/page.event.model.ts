// 🔹 Action inside eventActionContainers.actions[]
export interface Action {
  id?: string;
  actionType?: string;
  popupType?: string;
  popupControlName?: string;
  popupSettings?: any;
  isNewPopup?: boolean;
  canRaiseEventOnLoad?: boolean;
}

// 🔹 Param binding
export interface ParamBinding {
  id: string;
  fieldName: string;
  datasourceName: string;
  param: string;
}

// 🔹 Each container inside eventActionContainers (AFTER PARSE)
export interface EventActionContainer {
  id: string;
  eventType: string;
  subEventType: any;
  actions: Action[];
  paramBindings: ParamBinding[];
}

// 🔹 Page Event (IMPORTANT PART)
export interface PageEvent {
  id: string;
  pageName: string;
  eventProducerName: string;

  /**
   * BACKEND sends this as STRING
   * SERVICE parses it to EventActionContainer[]
   * So we allow BOTH to avoid TS errors
   */
  eventActionContainers: string | EventActionContainer[];

  appCode: string;
  createdBy: string;
  enabled: boolean;
  createDate: string;
  attributes: any;
  identifier: string;
}

// 🔹 Full API response (optional but useful)
export interface PageEventsApiResponse {
  appArtifactType: string;
  appArtifactName: string;
  totalResults: number;
  drafts: any[];
  published: PageEvent[];
}
