import {
  GetContactsRequest,
  GetContactsResponse,
  CreateContactRequest,
  CreateContactResponse,
  GetEmailTemplatesRequest,
  GetEmailTemplatesResponse,
  CreateEmailTemplateRequest,
  CreateEmailTemplateResponse,
  GetSMSTemplatesRequest,
  GetSMSTemplatesResponse,
  CreateSMSTemplateRequest,
  CreateSMSTemplateResponse
} from '../../admin'

interface GetAppContactsRequest extends GetContactsRequest {
  TargetAppID: string
}

interface GetAppContactsResponse extends GetContactsResponse {
}

interface CreateAppContactRequest extends CreateContactRequest {
  TargetAppID: string
}

interface CreateAppContactResponse extends CreateContactResponse {
}

interface GetAppEmailTempatesRequest extends GetEmailTemplatesRequest {
  TargetAppID: string
}

interface GetAppEmailTemplatesResponse extends GetEmailTemplatesResponse {
}

interface CreateAppEmailTemplateRequest extends CreateEmailTemplateRequest {
  TargetAppID: string
}

interface CreateAppEmailTemplateResponse extends CreateEmailTemplateResponse {
}

interface GetAppSMSTempatesRequest extends GetSMSTemplatesRequest {
  TargetAppID: string
}

interface GetAppSMSTemplatesResponse extends GetSMSTemplatesResponse {
}

interface CreateAppSMSTemplateRequest extends CreateSMSTemplateRequest {
  TargetAppID: string
}

interface CreateAppSMSTemplateResponse extends CreateSMSTemplateResponse {
}

export {
  GetAppContactsRequest,
  GetAppContactsResponse,
  CreateAppContactRequest,
  CreateAppContactResponse,
  GetAppEmailTempatesRequest,
  GetAppEmailTemplatesResponse,
  CreateAppEmailTemplateRequest,
  CreateAppEmailTemplateResponse,
  GetAppSMSTempatesRequest,
  GetAppSMSTemplatesResponse,
  CreateAppSMSTemplateRequest,
  CreateAppSMSTemplateResponse
}
