import { defineStore } from 'pinia'
import { EmailTemplate } from '../../../base'
import { doActionWithError } from '../../../action'
import { API } from './const'
import { 
  CreateAppEmailTemplateRequest, 
  CreateAppEmailTemplateResponse,
  GetAppEmailTemplatesRequest,
  GetAppEmailTemplatesResponse, 
  UpdateAppEmailTemplateRequest, 
  UpdateAppEmailTemplateResponse 
} from './types'


export const useChurchEmailTemplateStore = defineStore('church-emailtemplate-v4', {
  state: () => ({
    EmailTemplates: {
      EmailTemplates: new Map<string, Array<EmailTemplate>>(),
      Total: 0
    }
  }),
  getters: {
    getEmailTemplatesByAppID() : (targetAppID: string) => Array<EmailTemplate> {
      return (targetAppID: string) => {
        const data = this.EmailTemplates.EmailTemplates.get(targetAppID)
        return !data ? [] as Array<EmailTemplate> : data
      }
    }
  },
  actions: {
    createAppEmailTemplate (req: CreateAppEmailTemplateRequest, done: (emailTemplate: EmailTemplate, error: boolean) => void) {
      doActionWithError<CreateAppEmailTemplateRequest, CreateAppEmailTemplateResponse>(
        API.CREATE_APP_EMAILTEMPLATE,
        req,
        req.Message,
        (resp: CreateAppEmailTemplateResponse): void => {
          const emailTemplates = this.getEmailTemplatesByAppID(req.TargetAppID)
          emailTemplates.push(resp.Info)
          this.EmailTemplates.EmailTemplates.set(req.TargetAppID, emailTemplates)
          this.EmailTemplates.Total += 1
          done(resp.Info, false)
        }, () => {
          done({} as EmailTemplate, true)
      })
    },
    getAppEmailTemplates (req: GetAppEmailTemplatesRequest, done: (emailTemplates: Array<EmailTemplate>, error: boolean) => void) {
      doActionWithError<GetAppEmailTemplatesRequest, GetAppEmailTemplatesResponse>(
        API.GET_APP_EMAILTEMPLATES,
        req,
        req.Message,
        (resp: GetAppEmailTemplatesResponse): void => {
          const emailTemplates = this.getEmailTemplatesByAppID(req.TargetAppID)
          emailTemplates.push(...resp.Infos)
          this.EmailTemplates.EmailTemplates.set(req.TargetAppID, emailTemplates)
          this.EmailTemplates.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    },
    updateAppEmailTemplate (req: UpdateAppEmailTemplateRequest, done: (emailTemplate: EmailTemplate, error: boolean) => void) {
      doActionWithError<UpdateAppEmailTemplateRequest, UpdateAppEmailTemplateResponse>(
        API.UPDATE_APP_EMAILTEMPLATE,
        req,
        req.Message,
        (resp: UpdateAppEmailTemplateResponse): void => {
          const emailTemplates = this.getEmailTemplatesByAppID(req.TargetAppID)
          const index = emailTemplates.findIndex((el) => el.ID === resp.Info.ID)
          emailTemplates.splice(index, 1, resp.Info)
          this.EmailTemplates.EmailTemplates.set(req.TargetAppID, emailTemplates)
          done(resp.Info, false)
        }, () => {
          done({} as EmailTemplate, true)
      })
    },
  }
})