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

interface TemplateState {
  EmailTemplates: Array<EmailTemplate>
}

export {
  EmailTemplate,
  CreateEmailTemplateRequest,
  CreateEmailTemplateResponse,
  UpdateEmailTemplateRequest,
  UpdateEmailTemplateResponse,
  GetEmailTemplatesRequest,
  GetEmailTemplatesResponse,
  TemplateState
}
