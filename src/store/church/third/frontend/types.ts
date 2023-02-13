import { BaseRequest, EventType, FrontendTemplate } from '../../../base'

export interface CreateAppFrontendTemplateRequest extends BaseRequest {
  TargetAppID: string;
  TargetLangID: string;
  UsedFor: EventType;
  Title: string;
  Content: string;
  Sender: string;
}

export interface CreateAppFrontendTemplateResponse {
  Info: FrontendTemplate;
}

export interface GetAppFrontendTemplatesRequest extends BaseRequest {
  TargetAppID: string;
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetAppFrontendTemplatesResponse {
  Infos: FrontendTemplate[];
  /** @format int64 */
  Total: number;
}

export interface UpdateAppFrontendTemplateRequest extends BaseRequest {
  ID: string;
  TargetAppID: string;
  TargetLangID: string;
  Title: string;
  Content: string;
  UsedFor: EventType;
  Sender: string;
}

export interface UpdateAppFrontendTemplateResponse {
  Info: FrontendTemplate;
}
