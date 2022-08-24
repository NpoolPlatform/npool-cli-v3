import { defineStore } from 'pinia'
import { doActionWithError } from '../../../action'
import { App, Auth, Role, User } from '../../../base'
import { API } from './const'
import {
  GetAdminAppsRequest,
  GetAdminAppsResponse
} from './types'

export const useGenesisAdminStore = defineStore('genesis-admin-v3', {
  state: () => ({
    Apps: [] as Array<App>,
    Users: [] as Array<User>,
    Roles: [] as Array<Role>,
    Auths: new Map<string, Array<Auth>>()
  }),
  getters: {
    auths (): (appID: string) => Array<Auth> | undefined {
      return (appID: string) => {
        return this.Auths.get(appID)
      }
    }
  },
  actions: {
    getAdminApps (req: GetAdminAppsRequest, done: (apps: Array<App>, error: boolean) => void) {
      doActionWithError<GetAdminAppsRequest, GetAdminAppsResponse>(
        API.GET_ADMINAPPS,
        req,
        req.Message,
        (resp: GetAdminAppsResponse): void => {
          this.Apps = resp.Infos
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    }
  }
})

export * from './const'
export * from './types'
