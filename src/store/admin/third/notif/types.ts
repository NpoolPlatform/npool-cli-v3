import { BaseRequest, EventType, NotifTemplate } from '../../../base'

export interface CreateNotifTemplateRequest extends BaseRequest {
  AppID: string;
  TargetLangID: string;
  UsedFor: EventType;
  Title: string;
  Content: string;
  Sender: string;
}

export interface CreateNotifTemplateResponse {
  Info: NotifTemplate;
}

export interface GetNotifTemplateRequest extends BaseRequest {
  ID: string;
}

export interface GetNotifTemplateResponse {
  Info: NotifTemplate;
}

export interface GetNotifTemplatesRequest extends BaseRequest {
  AppID?: string;
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetNotifTemplatesResponse {
  Infos: NotifTemplate[];
  /** @format int64 */
  Total: number;
}

export interface UpdateNotifTemplateRequest extends BaseRequest {
  ID: string;
  AppID: string;
  Title: string;
  Content: string;
  TargetLangID: string;
  UsedFor: EventType;
  Sender: string;
}

export interface DeleteNotifTemplateResponse {
  Info: NotifTemplate;
}

export interface DeleteNotifTemplateRequest extends BaseRequest {
  ID: string;
  UsedFor: EventType;
}

export interface UpdateNotifTemplateResponse {
  Info: NotifTemplate;
}

export interface CreateAppNotifTemplateRequest extends BaseRequest {
  TargetAppID: string;
  TargetLangID: string;
  UsedFor: EventType;
  Title: string;
  Content: string;
  Sender: string;
}

export interface CreateAppNotifTemplateResponse {
  Info: NotifTemplate;
}

