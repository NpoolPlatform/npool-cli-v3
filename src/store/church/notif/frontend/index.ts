import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetAppFrontendTemplatesRequest,
  GetAppFrontendTemplatesResponse,
  CreateAppFrontendTemplateRequest,
  CreateAppFrontendTemplateResponse,
  UpdateAppFrontendTemplateRequest,
  UpdateAppFrontendTemplateResponse
} from './types'
import { doActionWithError } from '../../../action'
import { FrontendTemplate } from '../../../base'

export const useChurchFrontendTemplateStore = defineStore('church-frontendtemplate-v4', {
  state: () => ({
    FrontendTemplates: {
      FrontendTemplates: new Map<string, Array<FrontendTemplate>>(),
      Total: 0
    }
  }),
  getters: {
    getFrontendTemplatesByAppID () {
      return (appID: string) => {
        const rows = this.FrontendTemplates.FrontendTemplates.get(appID)
        return !rows ? [] as Array<FrontendTemplate> : rows
      }
    }
  },
  actions: {
    getAppFrontendTemplates (req: GetAppFrontendTemplatesRequest, done: (error: boolean, rows: Array<FrontendTemplate>) => void) {
      doActionWithError<GetAppFrontendTemplatesRequest, GetAppFrontendTemplatesResponse>(
        API.GET_APP_FRONTENDTEMPLATE,
        req,
        req.Message,
        (resp: GetAppFrontendTemplatesResponse): void => {
          const rows = this.getFrontendTemplatesByAppID(req.TargetAppID)
          rows.push(...resp.Infos)
          this.FrontendTemplates.FrontendTemplates.set(req.TargetAppID, rows)
          this.FrontendTemplates.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        }
      )
    },
    createAppFrontendTemplate (req: CreateAppFrontendTemplateRequest, done: (error: boolean, row: FrontendTemplate) => void) {
      doActionWithError<CreateAppFrontendTemplateRequest, CreateAppFrontendTemplateResponse>(
        API.CREATE_APP_FRONTENDTEMPLATE,
        req,
        req.Message,
        (resp: CreateAppFrontendTemplateResponse): void => {
          const rows = this.getFrontendTemplatesByAppID(req.TargetAppID)
          rows.push(resp.Info)
          this.FrontendTemplates.FrontendTemplates.set(req.TargetAppID, rows)
          this.FrontendTemplates.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as FrontendTemplate)
        }
      )
    },
    updateAppFrontendTemplate (req: UpdateAppFrontendTemplateRequest, done: (error: boolean, row: FrontendTemplate) => void) {
      doActionWithError<UpdateAppFrontendTemplateRequest, UpdateAppFrontendTemplateResponse>(
        API.UPDATE_APP_FRONTENDTEMPLATE,
        req,
        req.Message,
        (resp: UpdateAppFrontendTemplateResponse): void => {
          const rows = this.getFrontendTemplatesByAppID(req.TargetAppID)
          const index = rows.findIndex((el) => el.ID === resp.Info.ID)
          rows.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          this.FrontendTemplates.FrontendTemplates.set(req.TargetAppID, rows)
          done(false, resp.Info)
        }, () => {
          done(true, {} as FrontendTemplate)
        }
      )
    }
  }
})
