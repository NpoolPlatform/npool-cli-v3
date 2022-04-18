import { defineStore } from 'pinia'
import { UsersState } from './state'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { AppRoleUser, CreateAppRoleUserRequest, CreateAppRoleUserResponse, GetAppRoleUsersRequest, GetAppRoleUsersResponse } from './types'

export const useChurchRolesStore = defineStore('churchroles', {
  state: (): UsersState => ({
    RoleUsers: new Map<string, Array<AppRoleUser>>()
  }),
  getters: {
    getUserKey (): (appID: string, userRoleID: string) => string {
      return (appID: string, userRoleID: string) => {
        return appID + '-' + userRoleID
      }
    }
  },
  actions: {
    getRoleUsers (req: GetAppRoleUsersRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppRoleUsersRequest, GetAppRoleUsersResponse>(
        API.GET_ROLE_USERS,
        req,
        req.Message,
        (resp: GetAppRoleUsersResponse): void => {
          this.RoleUsers.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    createRoleUser (req: CreateAppRoleUserRequest, done: () => void) {
      doAction<CreateAppRoleUserRequest, CreateAppRoleUserResponse>(
        API.CREATE_ROLE_USER,
        req,
        req.Message,
        (resp: CreateAppRoleUserResponse): void => {
          const key = this.getUserKey(req.TargetAppID, req.Info.RoleID)
          let users = this.RoleUsers.get(key)
          if (!users) {
            users = []
          }
          users.push(resp.Info)
          this.RoleUsers.set(req.TargetAppID, users)
          done()
        })
    }
  }
})

export * from './types'
