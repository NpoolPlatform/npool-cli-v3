import { defineStore } from 'pinia'
import { API } from './const'
import {
  CreateNotifTemplateRequest,
  CreateNotifTemplateResponse,
  DeleteNotifTemplateRequest,
  DeleteNotifTemplateResponse,
  UpdateNotifTemplateRequest,
  UpdateNotifTemplateResponse,
  GetNotifTemplatesRequest,
  GetNotifTemplatesResponse
} from './types'
import { doActionWithError } from '../../../action'
import { NotifTemplate } from '../../../base'

export const useAdminNotifTemplateStore = defineStore('admin-notiftemplate-v4', {
  state: () => ({
    NotifTemplates: {
      NotifTemplates: [] as Array<NotifTemplate>,
      Total: 0
    }
  }),
  getters: {
  },
  actions: {
    getNotifTemplates (req: GetNotifTemplatesRequest, done: (error: boolean, rows: Array<NotifTemplate>) => void) {
      doActionWithError<GetNotifTemplatesRequest, GetNotifTemplatesResponse>(
        API.GET_NOTIFTEMPLATES,
        req,
        req.Message,
        (resp: GetNotifTemplatesResponse): void => {
          this.NotifTemplates.NotifTemplates.push(...resp.Infos)
          this.NotifTemplates.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<NotifTemplate>)
        }
      )
    },
    deleteNotifTemplate (req: DeleteNotifTemplateRequest, done: (error: boolean, row: NotifTemplate) => void) {
      doActionWithError<DeleteNotifTemplateRequest, DeleteNotifTemplateResponse>(
        API.DELETE_NOTIFTEMPLATE,
        req,
        req.Message,
        (resp: DeleteNotifTemplateResponse): void => {
          const index = this.NotifTemplates.NotifTemplates.findIndex((el) => el.ID === resp.Info.ID)
          this.NotifTemplates.NotifTemplates.splice(index, 1)
          this.NotifTemplates.Total -= 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as NotifTemplate)
        }
      )
    },
    createNotifTemplate (req: CreateNotifTemplateRequest, done: (error: boolean, row: NotifTemplate) => void) {
      doActionWithError<CreateNotifTemplateRequest, CreateNotifTemplateResponse>(
        API.CREATE_NOTIFTEMPLATE,
        req,
        req.Message,
        (resp: CreateNotifTemplateResponse): void => {
          this.NotifTemplates.NotifTemplates.push(resp.Info)
          this.NotifTemplates.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as NotifTemplate)
        }
      )
    },
    updateNotifTemplate (req: UpdateNotifTemplateRequest, done: (error: boolean, row: NotifTemplate) => void) {
      doActionWithError<UpdateNotifTemplateRequest, UpdateNotifTemplateResponse>(
        API.UPDATE_NOTIFTEMPLATE,
        req,
        req.Message,
        (resp: UpdateNotifTemplateResponse): void => {
          const index = this.NotifTemplates.NotifTemplates.findIndex((el) => el.ID === resp.Info.ID)
          this.NotifTemplates.NotifTemplates.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as NotifTemplate)
        }
      )
    }
  }
})
