

export interface Page {
  id: string;
  name: string;
  description: string | null;
  icon: string | null;
  enabled: boolean;
  createdBy: string;
  createDate: string;
  attributes: PageAttributes;
  labels: string[];
  modifiedDate: string;
  sortOrder: number | null;
  pageType: string;
  isSubPage: boolean;
  landingPage: boolean;
  parentPageName: string | null;
  appCode: string;
  siteCodes: string[];
  masterPage: string;
  toPageNames: string[];
  pageParams: string;
  thumbnailUrl: string | null;
  isSeed: boolean;
  identifier: string;
}

export interface PageAttributes {
  htmlLayout: string;
}
