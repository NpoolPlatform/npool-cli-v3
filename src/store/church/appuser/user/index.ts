import { defineStore } from 'pinia'
import { doActionWithError } from '../../../action'
import { Role, User } from '../../../base'
import { API } from './const'
import {
  ChurchUserState,
  GetAppRolesRequest,
  GetAppRolesResponse,
  GetAppUsersRequest,
  GetAppUsersResponse
} from './types'

export const useChurchUserStore = defineStore('church-user-v3', {
  state: (): ChurchUserState => ({
    Users: new Map<string, Array<User>>(),
    Roles: new Map<string, Array<Role>>()
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
          users.push(...resp.Infos)
          this.Users.set(req.TargetAppID, users)
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },

    getAppRoles (req: GetAppRolesRequest, done: (roles: Array<Role>, error: boolean) => void) {
      doActionWithError<GetAppRolesRequest, GetAppRolesResponse>(
        API.GET_APP_ROLES,
        req,
        req.Message,
        (resp: GetAppRolesResponse): void => {
          let roles = this.Roles.get(req.TargetAppID)
          if (!roles) {
            roles = []
          }
          roles.push(...resp.Infos)
          this.Roles.set(req.TargetAppID, roles)
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    }
  }
})
