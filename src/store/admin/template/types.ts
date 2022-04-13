import { ReqMessage } from '../../local/notifications'

interface EmailTemplate {
  ID?: string
  LangID: string
  DefaultToUsername: string
  UsedFor: string
  Sender: string
  ReplyTos: Array<string>
  CCTos: Array<string>
  Subject: string
  Body: string
}

interface CreateEmailTemplateRequest {
  TargetLangID: string
  Info: EmailTemplate
  Message: ReqMessage
}

interface CreateEmailTemplateResponse {
  Info: EmailTemplate
}

interface UpdateEmailTemplateRequest {
  Info: EmailTemplate
  Message: ReqMessage
}

interface UpdateEmailTemplateResponse {
  Info: EmailTemplate
}

interface GetEmailTemplatesRequest {
  Message: ReqMessage
}

interface GetEmailTemplatesResponse {
  Infos: Array<EmailTemplate>
}

interface SMSTemplate {
  ID?: string
  LangID: string
  UsedFor: string
  Subject: string
  Message: string
}

interface CreateSMSTemplateRequest {
  TargetLangID: string
  Info: SMSTemplate
  Message: ReqMessage
}

interface CreateSMSTemplateResponse {
  Info: SMSTemplate
}

interface UpdateSMSTemplateRequest {
  Info: SMSTemplate
  Message: ReqMessage
}

interface UpdateSMSTemplateResponse {
  Info: SMSTemplate
}

interface GetSMSTemplatesRequest {
  Message: ReqMessage
}

interface GetSMSTemplatesResponse {
  Infos: Array<SMSTemplate>
}

interface Contact {
  ID?: string
  UsedFor: string
  Account: string
  AccountType: string
  Sender: string
}

interface CreateContactRequest {
  Info: Contact
  Message: ReqMessage
}

interface CreateContactResponse {
  Info: Contact
}

interface UpdateContactRequest {
  Info: Contact
  Message: ReqMessage
}

interface UpdateContactResponse {
  Info: Contact
}

interface GetContactsRequest {
  Message: ReqMessage
}

interface GetContactsResponse {
  Infos: Array<Contact>
}

interface TemplateState {
  EmailTemplates: Array<EmailTemplate>
  SMSTemplates: Array<SMSTemplate>
  Contacts: Array<Contact>
}

export {
  EmailTemplate,
  CreateEmailTemplateRequest,
  CreateEmailTemplateResponse,
  UpdateEmailTemplateRequest,
  UpdateEmailTemplateResponse,
  GetEmailTemplatesRequest,
  GetEmailTemplatesResponse,
  SMSTemplate,
  CreateSMSTemplateRequest,
  CreateSMSTemplateResponse,
  UpdateSMSTemplateRequest,
  UpdateSMSTemplateResponse,
  GetSMSTemplatesRequest,
  GetSMSTemplatesResponse,
  Contact,
  CreateContactRequest,
  CreateContactResponse,
  UpdateContactRequest,
  UpdateContactResponse,
  GetContactsRequest,
  GetContactsResponse,
  TemplateState
}
