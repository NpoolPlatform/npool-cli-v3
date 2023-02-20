import { BaseRequest, FrontendTemplate, UsedFor } from '../../../base'

export interface CreateFrontendTemplateRequest extends BaseRequest {
  AppID: string;
  TargetLangID: string;
  UsedFor: UsedFor;
  Title: string;
  Content: string;
}

export interface CreateFrontendTemplateResponse {
  Info: FrontendTemplate;
}

export interface GetFrontendTemplateRequest extends BaseRequest {
  ID: string;
}

export interface GetFrontendTemplateResponse {
  Info: FrontendTemplate;
}

export interface GetFrontendTemplatesRequest extends BaseRequest {
  AppID?: string;
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetFrontendTemplatesResponse {
  Infos: FrontendTemplate[];
  /** @format int64 */
  Total: number;
}

export interface UpdateFrontendTemplateRequest extends BaseRequest {
  ID: string;
  AppID?: string;
  Title: string;
  Content: string;
  TargetLangID: string;
  UsedFor: UsedFor;
}

export interface DeleteFrontendTemplateResponse {
  Info: FrontendTemplate;
}

export interface DeleteFrontendTemplateRequest extends BaseRequest {
  ID: string;
  UsedFor: UsedFor;
}

export interface UpdateFrontendTemplateResponse {
  Info: FrontendTemplate;
}

export interface CreateAppFrontendTemplateRequest extends BaseRequest {
  TargetAppID: string;
  TargetLangID: string;
  UsedFor: UsedFor;
  Title: string;
  Content: string;
}

export interface CreateAppFrontendTemplateResponse {
  Info: FrontendTemplate;
}

