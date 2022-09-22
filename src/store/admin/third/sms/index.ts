import { defineStore } from 'pinia'
import { SMSTemplate } from '../../../base'
import { doActionWithError } from '../../../action'
import { API } from './const'
import { 
  CreateSMSTemplateRequest, 
  CreateSMSTemplateResponse, 
  GetSMSTemplatesRequest, 
  GetSMSTemplatesResponse, 
  UpdateSMSTemplateRequest, 
  UpdateSMSTemplateResponse 
} from './types'


export const useAdminSMSTemplateStore = defineStore('admin-smstemplate-v4', {
  state: () => ({
    SMSTemplates: {
      SMSTemplates: [] as Array<SMSTemplate>,
      Total: 0
    }
  }),
  getters: {},
  actions: {
    createSMSTemplate (req: CreateSMSTemplateRequest, done: (smsTemplate: SMSTemplate, error: boolean) => void) {
      doActionWithError<CreateSMSTemplateRequest, CreateSMSTemplateResponse>(
        API.CREATE_SMSTEMPLATE,
        req,
        req.NotifyMessage,
        (resp: CreateSMSTemplateResponse): void => {
          this.SMSTemplates.SMSTemplates.push(resp.Info)
          this.SMSTemplates.Total += 1
          done(resp.Info, false)
        }, () => {
          done({} as SMSTemplate, true)
      })
    },
    getSMSTemplates (req: GetSMSTemplatesRequest, done: (smsTemplates: Array<SMSTemplate>, error: boolean) => void) {
      doActionWithError<GetSMSTemplatesRequest, GetSMSTemplatesResponse>(
        API.GET_SMSTEMPLATES,
        req,
        req.Message,
        (resp: GetSMSTemplatesResponse): void => {
          this.SMSTemplates.SMSTemplates.push(...resp.Infos)
          this.SMSTemplates.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    },
    updateSMSTemplate (req: UpdateSMSTemplateRequest, done: (smsTemplate: SMSTemplate, error: boolean) => void) {
      doActionWithError<UpdateSMSTemplateRequest, UpdateSMSTemplateResponse>(
        API.UPDATE_SMSTEMPLATE,
        req,
        req.NotifyMessage,
        (resp: UpdateSMSTemplateResponse): void => {
          const index = this.SMSTemplates.SMSTemplates.findIndex((el) => el.ID === resp.Info.ID)
          this.SMSTemplates.SMSTemplates.splice(index, 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as SMSTemplate, true)
      })
    },
  }
})