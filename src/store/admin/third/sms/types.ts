import { UsedFor, SMSTemplate, MyRequest, BaseRequest } from '../../../base'


export interface CreateSMSTemplateRequest extends MyRequest{
  LangID: string;
  UsedFor: UsedFor;
  Subject: string;
  Message: string;
}

export interface CreateSMSTemplateResponse {
  Info: SMSTemplate;
}

export interface GetSMSTemplateRequest {
  ID: string;
}

export interface GetSMSTemplateResponse {
  Info: SMSTemplate;
}

export interface GetSMSTemplatesRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetSMSTemplatesResponse {
  Infos: SMSTemplate[];
  Total: number;
}

export interface UpdateSMSTemplateRequest extends MyRequest {
  ID: string;
  Subject: string;
  Message: string;
}

export interface UpdateSMSTemplateResponse {
  Info: SMSTemplate;
}