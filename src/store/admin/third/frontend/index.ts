import { defineStore } from 'pinia'
import { API } from './const'
import {
  CreateFrontendTemplateRequest,
  CreateFrontendTemplateResponse,
  DeleteFrontendTemplateRequest,
  DeleteFrontendTemplateResponse,
  UpdateFrontendTemplateRequest,
  UpdateFrontendTemplateResponse,
  GetFrontendTemplatesRequest,
  GetFrontendTemplatesResponse
} from './types'
import { doActionWithError } from '../../../action'
import { FrontendTemplate } from '../../../base'

export const useAdminFrontendTemplateStore = defineStore('admin-frontendtemplate-v4', {
  state: () => ({
    FrontendTemplates: {
      FrontendTemplates: [] as Array<FrontendTemplate>,
      Total: 0
    }
  }),
  getters: {
  },
  actions: {
    getFrontendTemplates (req: GetFrontendTemplatesRequest, done: (error: boolean, rows: Array<FrontendTemplate>) => void) {
      doActionWithError<GetFrontendTemplatesRequest, GetFrontendTemplatesResponse>(
        API.GET_FRONTENDTEMPLATES,
        req,
        req.Message,
        (resp: GetFrontendTemplatesResponse): void => {
          this.FrontendTemplates.FrontendTemplates.push(...resp.Infos)
          this.FrontendTemplates.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<FrontendTemplate>)
        }
      )
    },
    deleteFrontendTemplate (req: DeleteFrontendTemplateRequest, done: (error: boolean, row: FrontendTemplate) => void) {
      doActionWithError<DeleteFrontendTemplateRequest, DeleteFrontendTemplateResponse>(
        API.DELETE_FRONTENDTEMPLATE,
        req,
        req.Message,
        (resp: DeleteFrontendTemplateResponse): void => {
          const index = this.FrontendTemplates.FrontendTemplates.findIndex((el) => el.ID === resp.Info.ID)
          this.FrontendTemplates.FrontendTemplates.splice(index, 1)
          this.FrontendTemplates.Total -= 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as FrontendTemplate)
        }
      )
    },
    createFrontendTemplate (req: CreateFrontendTemplateRequest, done: (error: boolean, row: FrontendTemplate) => void) {
      doActionWithError<CreateFrontendTemplateRequest, CreateFrontendTemplateResponse>(
        API.CREATE_FRONTENDTEMPLATE,
        req,
        req.Message,
        (resp: CreateFrontendTemplateResponse): void => {
          this.FrontendTemplates.FrontendTemplates.push(resp.Info)
          this.FrontendTemplates.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as FrontendTemplate)
        }
      )
    },
    updateFrontendTemplate (req: UpdateFrontendTemplateRequest, done: (error: boolean, row: FrontendTemplate) => void) {
      doActionWithError<UpdateFrontendTemplateRequest, UpdateFrontendTemplateResponse>(
        API.UPDATE_FRONTENDTEMPLATE,
        req,
        req.Message,
        (resp: UpdateFrontendTemplateResponse): void => {
          const index = this.FrontendTemplates.FrontendTemplates.findIndex((el) => el.ID === resp.Info.ID)
          this.FrontendTemplates.FrontendTemplates.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as FrontendTemplate)
        }
      )
    }
  }
})
