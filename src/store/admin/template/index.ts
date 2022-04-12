import { defineStore } from 'pinia'
import { doActionWithError } from '../../action'
import { API } from './const'
import {
  GetEmailTemplatesRequest,
  GetEmailTemplatesResponse,
  TemplateState
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
    } 
  }
})