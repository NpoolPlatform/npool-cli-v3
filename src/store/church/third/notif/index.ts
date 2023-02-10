import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetAppNotifTemplatesRequest,
  GetAppNotifTemplatesResponse,
  CreateAppNotifTemplateRequest,
  CreateAppNotifTemplateResponse,
  UpdateAppNotifTemplateRequest,
  UpdateAppNotifTemplateResponse
} from './types'
import { doActionWithError } from '../../../action'
import { NotifTemplate } from '../../../base'

export const useChurchNotifTemplateStore = defineStore('church-notiftemplate-v4', {
  state: () => ({
    NotifTemplates: {
      NotifTemplates: new Map<string, Array<NotifTemplate>>(),
      Total: 0
    }
  }),
  getters: {
    getNotifTemplatesByAppID () {
      return (appID: string) => {
        const rows = this.NotifTemplates.NotifTemplates.get(appID)
        return !rows ? [] as Array<NotifTemplate> : rows
      }
    }
  },
  actions: {
    getAppNotifTemplates (req: GetAppNotifTemplatesRequest, done: (error: boolean, rows: Array<NotifTemplate>) => void) {
      doActionWithError<GetAppNotifTemplatesRequest, GetAppNotifTemplatesResponse>(
        API.GET_APP_NOTIFTEMPLATE,
        req,
        req.Message,
        (resp: GetAppNotifTemplatesResponse): void => {
          const rows = this.getNotifTemplatesByAppID(req.TargetAppID)
          rows.push(...resp.Infos)
          this.NotifTemplates.NotifTemplates.set(req.TargetAppID, rows)
          this.NotifTemplates.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        }
      )
    },
    createAppNotifTemplate (req: CreateAppNotifTemplateRequest, done: (error: boolean, row: NotifTemplate) => void) {
      doActionWithError<CreateAppNotifTemplateRequest, CreateAppNotifTemplateResponse>(
        API.CREATE_APP_NOTIFTEMPLATE,
        req,
        req.Message,
        (resp: CreateAppNotifTemplateResponse): void => {
          const rows = this.getNotifTemplatesByAppID(req.TargetAppID)
          rows.push(resp.Info)
          this.NotifTemplates.NotifTemplates.set(req.TargetAppID, rows)
          this.NotifTemplates.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as NotifTemplate)
        }
      )
    },
    updateAppNotifTemplate (req: UpdateAppNotifTemplateRequest, done: (error: boolean, row: NotifTemplate) => void) {
      doActionWithError<UpdateAppNotifTemplateRequest, UpdateAppNotifTemplateResponse>(
        API.UPDATE_APP_NOTIFTEMPLATE,
        req,
        req.Message,
        (resp: UpdateAppNotifTemplateResponse): void => {
          const rows = this.getNotifTemplatesByAppID(req.TargetAppID)
          const index = rows.findIndex((el) => el.ID === resp.Info.ID)
          rows.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          this.NotifTemplates.NotifTemplates.set(req.TargetAppID, rows)
          done(false, resp.Info)
        }, () => {
          done(true, {} as NotifTemplate)
        }
      )
    }
  }
})
