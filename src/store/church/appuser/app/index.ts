import { doActionWithError } from '../../../action'
import { defineStore } from 'pinia'
import { API } from './const'
import { App } from '../../../base'
import { CreateAppRequest, CreateAppResponse, GetAppsRequest, GetAppsResponse, UpdateAppRequest, UpdateAppResponse } from './types'

export const useChurchAppStore = defineStore('church-app-v4', {
  state: () => ({
    Apps: {
      Apps: [] as Array<App>,
      Total: 0
    }

  }),
  getters: {
    getAppByID() {
      return (appID:string) => {
        return this.Apps.Apps.find((al) => al.ID === appID)
      }
    }
  },
  actions: {
    getApps (req: GetAppsRequest, done: (apps: Array<App>, error: boolean) => void) {
      doActionWithError<GetAppsRequest, GetAppsResponse>(
        API.GET_APPS,
        req,
        req.Message,
        (resp: GetAppsResponse): void => {
          this.Apps.Apps.push(...resp.Infos)
          this.Apps.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    updateApp (req: UpdateAppRequest, done: (app: App, error: boolean) => void) {
      doActionWithError<UpdateAppRequest, UpdateAppResponse>(
        API.UPDATE_APP,
        req,
        req.Message,
        (resp: UpdateAppResponse): void => {
          const index = this.Apps.Apps.findIndex((el) => el.ID === resp.Info.ID)
          this.Apps.Apps.splice(index, 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as App, true)
        })
    },
    createApp (req: CreateAppRequest, done: (app: App, error: boolean) => void) {
      doActionWithError<CreateAppRequest, CreateAppResponse>(
        API.CREATE_APP,
        req,
        req.Message,
        (resp: CreateAppResponse): void => {
          this.Apps.Apps.push(resp.Info)
          this.Apps.Total += 1
          done(resp.Info, false)
        }, () => {
          done({} as App, true)
        })
    },
  }
})
