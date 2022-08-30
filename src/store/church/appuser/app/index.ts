import { doActionWithError } from '../../../action'
import { defineStore } from 'pinia'
import { API } from './const'
import { App } from '../../../base'
import { GetAppsRequest, GetAppsResponse } from './types'

export const useChurchAppStore = defineStore('church-app-v4', {
  state: () => ({
    Apps: [] as Array<App>
  }),
  getters: {},
  actions: {
    getApps (req: GetAppsRequest, done: (apps: Array<App>, error: boolean) => void) {
      doActionWithError<GetAppsRequest, GetAppsResponse>(
        API.GET_APPLICATIONS,
        req,
        req.Message,
        (resp: GetAppsResponse): void => {
          this.Apps = resp.Infos
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    }
  }
})
