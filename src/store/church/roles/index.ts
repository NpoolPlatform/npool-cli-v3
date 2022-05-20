import { defineStore } from 'pinia'
import { UsersState } from './state'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { AppRoleUser, CreateAppRoleResponse, CreateAppRoleUserRequest, CreateAppRoleUserResponse, GetAppRolesRequest, GetAppRolesResponse, GetAppRoleUsersRequest, GetAppRoleUsersResponse } from './types'
import { AppRole } from '../../frontend'
import { CreateAppRoleRequest } from '..'
import { UpdateRoleRequest, UpdateRoleResponse } from '../../admin'
import { API as AdminAPI } from '../../admin/roles/const'

export const useChurchRolesStore = defineStore('churchroles', {
  state: (): UsersState => ({
    RoleUsers: new Map<string, Array<AppRoleUser>>(),
    Roles: new Map<string, Array<AppRole>>()
  }),
  getters: {
    getUserKey (): (appID: string, userRoleID: string) => string {
      return (appID: string, userRoleID: string) => {
        return appID + '-' + userRoleID
      }
    }
  },
  actions: {
    createRole (req: CreateAppRoleRequest, done: () => void) {
      doAction<CreateAppRoleRequest, CreateAppRoleResponse>(
        API.CREATE_ROLE,
        req,
        req.Message,
        (resp: CreateAppRoleResponse): void => {
          let roles = this.Roles.get(req.TargetAppID)
          if (!roles) {
            roles = []
          }
          roles.push(resp.Info)
          this.Roles.set(req.TargetAppID, roles)
          done()
        })
    },
    updateRole (req: UpdateRoleRequest, done: () => void) {
      doAction<UpdateRoleRequest, UpdateRoleResponse>(
        AdminAPI.UPDATE_ROLE,
        req,
        req.Message,
        (resp: UpdateRoleResponse): void => {
          let roles = this.Roles.get(req.Info.AppID)
          if (!roles) {
            roles = []
          }
          const index = roles.findIndex((el) => el.ID === req.Info.ID)
          roles.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          this.Roles.set(req.Info.AppID, roles)
          done()
        })
    },
    getRoles (req: GetAppRolesRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppRolesRequest, GetAppRolesResponse>(
        API.GET_ROLES,
        req,
        req.Message,
        (resp: GetAppRolesResponse): void => {
          this.Roles.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
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
