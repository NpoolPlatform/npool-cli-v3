import { defineStore } from 'pinia'
import { doActionWithError } from '../../../action'
import { Role, AppRoleUser } from '../../../base'
import { API } from './const'
import {
  AppRoleAndUser,
  ChurchRoleState,
  CreateAppRoleRequest,
  CreateAppRoleResponse,
  CreateAppRoleUserRequest,
  CreateAppRoleUserResponse,
  DeleteAppRoleUserRequest,
  DeleteAppRoleUserResponse,
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
    getAppRoleUsers (req: GetAppRoleUsersRequest, done: (users: Array<AppRoleUser>, error: boolean) => void) {
      doActionWithError<GetAppRoleUsersRequest, GetAppRoleUsersResponse>(
        API.GET_APP_ROLE_USERS,
        req,
        req.Message,
        (resp: GetAppRoleUsersResponse): void => {
          let roleUsers = this.AppRoleUsers.get(req.RoleID) // ONE APP HAVE MORE ROLE
          if (!roleUsers) {
            roleUsers = []
          }
          roleUsers.push(...resp.Infos)
          this.AppRoleUsers.set(req.RoleID, roleUsers)
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    createAppRoleUser (req: CreateAppRoleUserRequest, done: (users: AppRoleUser, error: boolean) => void) {
      doActionWithError<CreateAppRoleUserRequest, CreateAppRoleUserResponse>(
        API.CREATE_APP_ROLE_USER,
        req,
        req.Message,
        (resp: CreateAppRoleUserResponse): void => {
          let roleUsers = this.AppRoleUsers.get(req.RoleID)
          if (!roleUsers) {
            roleUsers = []
          }
          roleUsers.splice(0, 0, resp.Info)
          this.AppRoleUsers.set(req.RoleID, roleUsers)
          done(resp.Info, false)
        }, () => {
          done(undefined as unknown as AppRoleUser, true)
        })
    },
    deleteAppRoleUser (req: DeleteAppRoleUserRequest, done: (appRoleUser: AppRoleAndUser ,error: boolean) => void) {
      doActionWithError<DeleteAppRoleUserRequest, DeleteAppRoleUserResponse>(
        API.DELETE_APP_ROLE_USER,
        req,
        req.Message,
        (resp: DeleteAppRoleUserResponse): void => {
          let roleUsers = this.AppRoleUsers.get(resp.Info.RoleID)
          if (!roleUsers) {
            roleUsers = []
          }
          const index = roleUsers.findIndex((el) => el.UserID === resp.Info.UserID)
          roleUsers.splice(index, 1)
          this.AppRoleUsers.set(req.TargetAppID, roleUsers)
          done(resp.Info, false)
        }, () => {
          done(undefined as unknown as AppRoleAndUser, true)
        })
    },
  }
})
