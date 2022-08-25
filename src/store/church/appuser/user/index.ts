import { defineStore } from 'pinia'
import { doActionWithError } from '../../../action'
import { Auth, Role, User } from '../../../base'
import { API } from './const'
import {
  GetAppAuthsRequest,
  GetAppAuthsResponse,
  GetAppRolesRequest,
  GetAppRolesResponse,
  GetAppUsersRequest,
  GetAppUsersResponse
} from './types'

export const useChurchUserStore = defineStore('church-user-v3', {
  state: () => ({
    Users: new Map<string, Array<User>>(),
    Roles: new Map<string, Array<Role>>(),
    Auths: new Map<string, Array<Auth>>()
  }),
  getters: {},
  actions: {
    getAppUsers (req: GetAppUsersRequest, done: (users: Array<User>, error: boolean) => void) {
      doActionWithError<GetAppUsersRequest, GetAppUsersResponse>(
        API.GET_APP_USERS,
        req,
        req.Message,
        (resp: GetAppUsersResponse): void => {
          this.Users.set(req.TargetAppID, resp.Infos)
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },

    getAppRoles (req: GetAppRolesRequest, done: (users: Array<Role>, error: boolean) => void) {
      doActionWithError<GetAppRolesRequest, GetAppRolesResponse>(
        API.GET_APP_USERS,
        req,
        req.Message,
        (resp: GetAppRolesResponse): void => {
          this.Roles.set(req.TargetAppID, resp.Infos)
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },

    getAppAuths (req: GetAppAuthsRequest, done: (users: Array<Auth>, error: boolean) => void) {
      doActionWithError<GetAppAuthsRequest, GetAppAuthsResponse>(
        API.GET_APP_USERS,
        req,
        req.Message,
        (resp: GetAppAuthsResponse): void => {
          this.Auths.set(req.TargetAppID, resp.Infos)
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    }
  }
})
