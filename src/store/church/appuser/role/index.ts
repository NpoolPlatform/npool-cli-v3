import { defineStore } from 'pinia'
import { doActionWithError } from '../../../action'
import { Role, AppRoleUser } from '../../../base'
import { API } from './const'
import {
  ChurchRoleState,
  CreateAppRoleRequest,
  CreateAppRoleResponse,
  CreateAppRoleUserRequest,
  CreateAppRoleUserResponse,
  GetAppRolesRequest,
  GetAppRolesResponse,
  GetAppRoleUsersRequest,
  GetAppRoleUsersResponse,
} from './types'

export const useChurchRoleStore = defineStore('church-role-v3', {
  state: (): ChurchRoleState => ({
    Roles: new Map<string, Array<Role>>(),
    AppRoleUsers: new Map<string, Array<AppRoleUser>>()
  }),
  getters: {},
  actions: {
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
    },
    createAppRole (req: CreateAppRoleRequest, done: (roles: Role, error: boolean) => void) {
      doActionWithError<CreateAppRoleRequest, CreateAppRoleResponse>(
        API.CREATE_APP_ROLE,
        req,
        req.Message,
        (resp: CreateAppRoleResponse): void => {
          let roles = this.Roles.get(req.TargetAppID)
          if (!roles) {
            roles = []
          }
          roles.push(resp.Info)
          this.Roles.set(req.TargetAppID, roles)
          done(resp.Info, false)
        }, () => {
          done(undefined as unknown as Role, true)
        })
    },
    getAppRoleUsers (req: GetAppRoleUsersRequest, done: (roles: Array<AppRoleUser>, error: boolean) => void) {
      doActionWithError<GetAppRoleUsersRequest, GetAppRoleUsersResponse>(
        API.GET_APP_ROLE_USERS,
        req,
        req.Message,
        (resp: GetAppRoleUsersResponse): void => {
          let roleUsers = this.AppRoleUsers.get(req.TargetAppID)
          if (!roleUsers) {
            roleUsers = []
          }
          roleUsers.push(...resp.Infos)
          this.AppRoleUsers.set(req.TargetAppID, roleUsers)
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    getAppRoleUsersContinuously (req: GetAppRoleUsersRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppRoleUsersRequest, GetAppRoleUsersResponse>(
        API.GET_APP_ROLE_USERS,
        req,
        req.Message,
        (resp: GetAppRoleUsersResponse): void => {
          let roleUsers = this.AppRoleUsers.get(req.TargetAppID)
          if (!roleUsers) {
            roleUsers = []
          }
          roleUsers.push(...resp.Infos)
          this.AppRoleUsers.set(req.TargetAppID, roleUsers)
          if (resp.Infos.length < req.Limit) {
            done(false)
            return
          }
          req.Offset = req.Limit + req.Limit
          this.getAppRoleUsersContinuously(req, done)
        }, () => {
          done(true)
        })
    },
    createAppRoleUser (req: CreateAppRoleUserRequest, done: (roles: Role, error: boolean) => void) {
      doActionWithError<CreateAppRoleUserRequest, CreateAppRoleUserResponse>(
        API.CREATE_APP_ROLE_USER,
        req,
        req.Message,
        (resp: CreateAppRoleUserResponse): void => {
          let roleUsers = this.AppRoleUsers.get(req.TargetAppID)
          if (!roleUsers) {
            roleUsers = []
          }
          roleUsers.push(resp.Info)
          this.AppRoleUsers.set(req.TargetAppID, roleUsers)
          done(resp.Info, false)
        }, () => {
          done(undefined as unknown as AppRoleUser, true)
        })
    },
  }
})
