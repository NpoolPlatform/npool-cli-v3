import { defineStore } from 'pinia'
import { EmailTemplate } from '../../../base'
import { doActionWithError } from '../../../action'
import { API } from './const'
import { CreateEmailTemplateRequest, CreateEmailTemplateResponse, GetEmailTemplatesRequest, GetEmailTemplatesResponse, UpdateEmailTemplateRequest, UpdateEmailTemplateResponse } from './types'


export const useAdminEmailTemplateStore = defineStore('admin-emailtemplate-v4', {
  state: () => ({
    EmailTemplates: {
      EmailTemplates: [] as Array<EmailTemplate>,
      Total: 0
    }
  }),
  getters: {},
  actions: {
    createEmailTemplate (req: CreateEmailTemplateRequest, done: (emailTemplate: EmailTemplate, error: boolean) => void) {
      doActionWithError<CreateEmailTemplateRequest, CreateEmailTemplateResponse>(
        API.CREATE_EMAILTEMPLATE,
        req,
        req.Message,
        (resp: CreateEmailTemplateResponse): void => {
          this.EmailTemplates.EmailTemplates.push(resp.Info)
          this.EmailTemplates.Total += 1
          done(resp.Info, false)
        }, () => {
          done({} as EmailTemplate, true)
      })
    },
    getEmailTemplates (req: GetEmailTemplatesRequest, done: (emailTemplates: Array<EmailTemplate>, error: boolean) => void) {
      doActionWithError<GetEmailTemplatesRequest, GetEmailTemplatesResponse>(
        API.GET_EMAILTEMPLATES,
        req,
        req.Message,
        (resp: GetEmailTemplatesResponse): void => {
          this.EmailTemplates.EmailTemplates.push(...resp.Infos)
          this.EmailTemplates.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    },
    updateEmailTemplate (req: UpdateEmailTemplateRequest, done: (emailTemplate: EmailTemplate, error: boolean) => void) {
      doActionWithError<UpdateEmailTemplateRequest, UpdateEmailTemplateResponse>(
        API.UPDATE_EMAILTEMPLATE,
        req,
        req.Message,
        (resp: UpdateEmailTemplateResponse): void => {
          const index = this.EmailTemplates.EmailTemplates.findIndex((el) => el.ID === resp.Info.ID)
          this.EmailTemplates.EmailTemplates.splice(index, 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as EmailTemplate, true)
      })
    },
  }
})