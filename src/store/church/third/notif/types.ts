import { BaseRequest, EventType, NotifTemplate } from '../../../base'

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

export interface GetAppNotifTemplatesRequest extends BaseRequest {
  TargetAppID: string;
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetAppNotifTemplatesResponse {
  Infos: NotifTemplate[];
  /** @format int64 */
  Total: number;
}

export interface UpdateAppNotifTemplateRequest extends BaseRequest {
  ID: string;
  TargetAppID: string;
  TargetLangID: string;
  Title: string;
  Content: string;
  UsedFor: EventType;
  Sender: string;
}

export interface UpdateAppNotifTemplateResponse {
  Info: NotifTemplate;
}
