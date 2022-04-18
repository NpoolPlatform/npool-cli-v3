import { defineStore } from 'pinia'
import { Application } from '../../frontend'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import {
  ApplicationsState,
  CreateAppControlRequest,
  CreateAppControlResponse,
  GetApplicationsRequest,
  GetApplicationsResponse,
  UpdateAppControlRequest,
  UpdateAppControlResponse
} from './types'

export const useApplicationsStore = defineStore('applications', {
  state: (): ApplicationsState => ({
    Applications: []
  }),
  getters: {
    getApplicationByID (): (appID: string) => Application {
      return (appID: string) => {
        const index = this.Applications.findIndex((el) => el.App.ID === appID)
        return index < 0 ? undefined as unknown as Application : this.Applications[index]
      }
    }
  },
  actions: {
    getApplications (req: GetApplicationsRequest, done: (error: boolean) => void) {
      doActionWithError<GetApplicationsRequest, GetApplicationsResponse>(
        API.GET_APPLICATIONS,
        req,
        req.Message,
        (resp: GetApplicationsResponse): void => {
          this.Applications = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    createAppCtrl (req: CreateAppControlRequest, done: () => void) {
      doAction<CreateAppControlRequest, CreateAppControlResponse>(
        API.CREATE_APP_CONTROL,
        req,
        req.Message,
        (resp: CreateAppControlResponse): void => {
          const index = this.Applications.findIndex((app) => app.App.ID === resp.Info.AppID)
          const app = this.Applications[index]
          app.Ctrl = resp.Info
          this.Applications.splice(index, 1, app)
          done()
        })
    },
    updateAppCtrl (req: UpdateAppControlRequest, done: () => void) {
      doAction<UpdateAppControlRequest, UpdateAppControlResponse>(
        API.UPDATE_APP_CONTROL,
        req,
        req.Message,
        (resp: UpdateAppControlResponse): void => {
          const index = this.Applications.findIndex((app) => app.App.ID === resp.Info.AppID)
          const app = this.Applications[index]
          app.Ctrl = resp.Info
          this.Applications.splice(index, 1, app)
          done()
        })
    }
  }
})

export * from './types'
