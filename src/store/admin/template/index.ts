import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import {
  CreateEmailTemplateRequest,
  CreateEmailTemplateResponse,
  EmailTemplate,
  GetEmailTemplatesRequest,
  GetEmailTemplatesResponse,
  TemplateState,
  UpdateEmailTemplateRequest,
  UpdateEmailTemplateResponse
} from './types'

export const useTemplateStore = defineStore('template', {
  state: (): TemplateState => ({
    EmailTemplates: []
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
    }
  }
})