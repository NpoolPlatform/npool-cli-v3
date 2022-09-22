import { UsedFor, BaseRequest, EmailTemplate } from '../../../base'

export interface CreateAppEmailTemplateRequest extends BaseRequest {
  TargetAppID: string;
  LangID: string;
  UsedFor: UsedFor;
  Sender: string;
  ReplyTos: string[];
  CCTos: string[];
  Subject: string;
  Body: string;
  DefaultToUsername: string;
}

export interface CreateAppEmailTemplateResponse {
  Info: EmailTemplate;
}

export interface GetAppEmailTemplatesRequest extends BaseRequest {
  TargetAppID: string;
  Offset: number;
  Limit: number;
}

export interface GetAppEmailTemplatesResponse {
  Infos: EmailTemplate[];
  Total: number;
}

export interface UpdateAppEmailTemplateRequest extends BaseRequest {
  TargetAppID: string;
  ID: string;
  LangID: string;
  UsedFor: UsedFor;
  Sender: string;
  ReplyTos: string[];
  CCTos: string[];
  Subject: string;
  Body: string;
  DefaultToUsername: string;
}

export interface UpdateAppEmailTemplateResponse {
  Info: EmailTemplate;
}