import { UsedFor, BaseRequest, MyRequest, SMSTemplate } from '../../../base'


export interface CreateAppSMSTemplateRequest extends MyRequest {
  TargetAppID: string;
  TargetLangID: string;
  UsedFor: UsedFor;
  Subject: string;
  Message: string;
}

export interface CreateAppSMSTemplateResponse {
  Info: SMSTemplate;
}

export interface GetAppSMSTemplatesRequest extends BaseRequest {
  TargetAppID: string;
  Offset: number;
  Limit: number;
}

export interface GetAppSMSTemplatesResponse {
  Infos: SMSTemplate[];
  Total: number;
}


export interface UpdateAppSMSTemplateRequest extends MyRequest {
  TargetAppID: string;
  TargetLangID: string;
  ID: string;
  AppID: string;
  LangID: string;
  UsedFor: UsedFor;
  Subject: string;
  Message: string;
}

export interface UpdateAppSMSTemplateResponse {
  Info: SMSTemplate;
}

export interface DeleteAppSMSTemplatesRequest extends BaseRequest {
  TargetAppID: string;
  ID: string;
}

export interface DeleteAppSMSTemplateResponse {
  Info: SMSTemplate;
}