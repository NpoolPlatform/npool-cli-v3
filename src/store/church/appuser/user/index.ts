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
          let users = this.Users.get(req.TargetAppID)
          if (!users) {
            users = []
          }
          users.concat(resp.Infos)
          this.Users.set(req.TargetAppID, users)
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
          let roles = this.Roles.get(req.TargetAppID)
          if (!roles) {
            roles = []
          }
          roles.concat(resp.Infos)
          this.Roles.set(req.TargetAppID, roles)
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
          let auths = this.Auths.get(req.TargetAppID)
          if (!auths) {
            auths = []
          }
          auths.concat(resp.Infos)
          this.Auths.set(req.TargetAppID, auths)
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    }
  }
})
