import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import {
  CreateEmailTemplateRequest,
  CreateEmailTemplateResponse,
  CreateSMSTemplateRequest,
  CreateSMSTemplateResponse,
  EmailTemplate,
  GetEmailTemplatesRequest,
  GetEmailTemplatesResponse,
  GetSMSTemplatesRequest,
  GetSMSTemplatesResponse,
  SMSTemplate,
  TemplateState,
  UpdateEmailTemplateRequest,
  UpdateEmailTemplateResponse,
  UpdateSMSTemplateRequest,
  UpdateSMSTemplateResponse
} from './types'

export const useTemplateStore = defineStore('template', {
  state: (): TemplateState => ({
    EmailTemplates: [],
    SMSTemplates: []
  }),
  getters: {},
  actions: {
    getEmailTemplates (req: GetEmailTemplatesRequest, done: (error: boolean) => void) {
      doActionWithError<GetEmailTemplatesRequest, GetEmailTemplatesResponse>(
        API.GET_EMAIL_TEMPALTES,
        req,
        req.Message,
        (resp: GetEmailTemplatesResponse): void => {
          this.EmailTemplates = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    createEmailTemplate (req: CreateEmailTemplateRequest, done: () => void) {
      doAction<CreateEmailTemplateRequest, CreateEmailTemplateResponse>(
        API.CREATE_EMAIL_TEMPLATE,
        req,
        req.Message,
        (resp: CreateEmailTemplateResponse): void => {
          this.EmailTemplates.splice(0, 0, resp.Info)
          done()
        })
    },
    updateEmailTemplate (req: UpdateEmailTemplateRequest, done: () => void) {
      doAction<UpdateEmailTemplateRequest, UpdateEmailTemplateResponse>(
        API.UPDATE_EMAIL_TEMPLATE,
        req,
        req.Message,
        (resp: UpdateEmailTemplateResponse): void => {
          const index = this.EmailTemplates.findIndex((el: EmailTemplate) => el.ID === resp.Info.ID)
          this.EmailTemplates.splice(index, index === -1 ? 0 : 1, resp.Info)
          done()
        })
    },
    getSMSTemplates (req: GetSMSTemplatesRequest, done: (error: boolean) => void) {
      doActionWithError<GetSMSTemplatesRequest, GetSMSTemplatesResponse>(
        API.GET_SMS_TEMPALTES,
        req,
        req.Message,
        (resp: GetSMSTemplatesResponse): void => {
          this.SMSTemplates = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    createSMSTemplate (req: CreateSMSTemplateRequest, done: () => void) {
      doAction<CreateSMSTemplateRequest, CreateSMSTemplateResponse>(
        API.CREATE_SMS_TEMPLATE,
        req,
        req.Message,
        (resp: CreateSMSTemplateResponse): void => {
          this.SMSTemplates.splice(0, 0, resp.Info)
          done()
        })
    },
    updateSMSTemplate (req: UpdateSMSTemplateRequest, done: () => void) {
      doAction<UpdateSMSTemplateRequest, UpdateSMSTemplateResponse>(
        API.UPDATE_SMS_TEMPLATE,
        req,
        req.Message,
        (resp: UpdateSMSTemplateResponse): void => {
          const index = this.SMSTemplates.findIndex((el: SMSTemplate) => el.ID === resp.Info.ID)
          this.SMSTemplates.splice(index, index === -1 ? 0 : 1, resp.Info)
          done()
        })
    }
  }
})

export * from './types'
