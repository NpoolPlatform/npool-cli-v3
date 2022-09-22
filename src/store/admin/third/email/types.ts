import { UsedFor, BaseRequest, EmailTemplate } from '../../../base'

export interface CreateEmailTemplateRequest extends BaseRequest {
  LangID: string;
  UsedFor: UsedFor;
  Sender: string;
  ReplyTos: string[];
  CCTos: string[];
  Subject: string;
  Body: string;
  DefaultToUsername: string;
}

export interface CreateEmailTemplateResponse {
  Info: EmailTemplate;
}

export interface GetEmailTemplateRequest extends BaseRequest {
  ID: string;
}

export interface GetEmailTemplateResponse {
  Info: EmailTemplate;
}

export interface GetEmailTemplatesRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetEmailTemplatesResponse {
  Infos: EmailTemplate[];
  Total: number;
}

export interface UpdateEmailTemplateRequest extends BaseRequest {
  ID: string;
  Sender: string;
  ReplyTos: string[];
  CCTos: string[];
  Subject: string;
  Body: string;
  DefaultToUsername: string;
}

export interface UpdateEmailTemplateResponse {
  Info: EmailTemplate;
}