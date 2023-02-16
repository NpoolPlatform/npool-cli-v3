import { defineStore } from 'pinia'
import { SMSTemplate } from '../../../base'
import { doActionWithError } from '../../../action'
import { API } from './const'
import { 
  CreateAppSMSTemplateRequest, 
  CreateAppSMSTemplateResponse,
  GetAppSMSTemplatesRequest,
  GetAppSMSTemplatesResponse, 
  UpdateAppSMSTemplateRequest, 
  UpdateAppSMSTemplateResponse,
  DeleteAppSMSTemplatesRequest,
  DeleteAppSMSTemplateResponse
} from './types'


export const useChurchSMSTemplateStore = defineStore('church-smstemplate-v4', {
  state: () => ({
    SMSTemplates: {
      SMSTemplates: new Map<string, Array<SMSTemplate>>(),
      Total: 0
    }
  }),
  getters: {
    getSMSTemplatesByAppID() : (targetAppID: string) => Array<SMSTemplate> {
      return (targetAppID: string) => {
        const data = this.SMSTemplates.SMSTemplates.get(targetAppID)
        return !data ? [] as Array<SMSTemplate> : data
      }
    }
  },
  actions: {
    createAppSMSTemplate (req: CreateAppSMSTemplateRequest, done: (smsTemplate: SMSTemplate, error: boolean) => void) {
      doActionWithError<CreateAppSMSTemplateRequest, CreateAppSMSTemplateResponse>(
        API.CREATE_APP_SMSTEMPLATE,
        req,
        req.NotifyMessage,
        (resp: CreateAppSMSTemplateResponse): void => {
          const emailTemplates = this.getSMSTemplatesByAppID(req.TargetAppID)
          emailTemplates.push(resp.Info)
          this.SMSTemplates.SMSTemplates.set(req.TargetAppID, emailTemplates)
          this.SMSTemplates.Total += 1
          done(resp.Info, false)
        }, () => {
          done({} as SMSTemplate, true)
      })
    },
    getAppSMSTemplates (req: GetAppSMSTemplatesRequest, done: (smsTemplates: Array<SMSTemplate>, error: boolean) => void) {
      doActionWithError<GetAppSMSTemplatesRequest, GetAppSMSTemplatesResponse>(
        API.GET_APP_SMSTEMPLATES,
        req,
        req.Message,
        (resp: GetAppSMSTemplatesResponse): void => {
          const emailTemplates = this.getSMSTemplatesByAppID(req.TargetAppID)
          emailTemplates.push(...resp.Infos)
          this.SMSTemplates.SMSTemplates.set(req.TargetAppID, emailTemplates)
          this.SMSTemplates.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    },
    updateAppSMSTemplate (req: UpdateAppSMSTemplateRequest, done: (smsTemplate: SMSTemplate, error: boolean) => void) {
      doActionWithError<UpdateAppSMSTemplateRequest, UpdateAppSMSTemplateResponse>(
        API.UPDATE_APP_SMSTEMPLATE,
        req,
        req.NotifyMessage,
        (resp: UpdateAppSMSTemplateResponse): void => {
          const emailTemplates = this.getSMSTemplatesByAppID(req.TargetAppID)
          const index = emailTemplates.findIndex((el) => el.ID === resp.Info.ID)
          emailTemplates.splice(index, 1, resp.Info)
          this.SMSTemplates.SMSTemplates.set(req.TargetAppID, emailTemplates)
          done(resp.Info, false)
        }, () => {
          done({} as SMSTemplate, true)
      })
    },
    deleteAppSMSTemplate (req: DeleteAppSMSTemplatesRequest, done: (smsTemplate: SMSTemplate, error: boolean) => void) {
      doActionWithError<DeleteAppSMSTemplatesRequest, DeleteAppSMSTemplateResponse>(
        API.DELETE_APP_SMSTEMPLATE,
        req,
        req.Message,
        (resp: DeleteAppSMSTemplateResponse): void => {
          const emailTemplates = this.getSMSTemplatesByAppID(req.TargetAppID)
          const index = emailTemplates.findIndex((el) => el.ID === resp.Info.ID)
          emailTemplates.splice(index, 1)
          this.SMSTemplates.SMSTemplates.set(req.TargetAppID, emailTemplates)
          this.SMSTemplates.Total -= 1
          done(resp.Info, false)
        }, () => {
          done({} as SMSTemplate, true)
      })
    },
  }
})