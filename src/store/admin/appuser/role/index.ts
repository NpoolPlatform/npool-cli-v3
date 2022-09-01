import { defineStore } from 'pinia'
import { API } from './const'
import {  Role, AppRoleUser, RoleUserRelation } from '../../../base'
import { doActionWithError } from '../../../action'

import {
  CreateRoleUserRequest,
  CreateRoleUserResponse,
  DeleteRoleUserRequest,
  DeleteRoleUserResponse,
  GetRolesRequest,
  GetRolesResponse,
  GetRoleUsersRequest,
  GetRoleUsersResponse
} from './types'

export const useAdminRoleStore = defineStore('admin-role-v3', {
  state: () => ({
    Roles: {
      Roles: [] as Array<Role>,
      Total: 0
    },
    RoleUsers: {
      RoleUsers: new Map<string, Array<AppRoleUser>>(),
      Total: 0
    }
  }),
  getters: {
    roleUsers() : (roleID: string) => Array<AppRoleUser> {
      return (roleID: string) => {
        const data = this.RoleUsers.RoleUsers.get(roleID)
        return !data ? [] as Array<AppRoleUser> : data
      }
    }
  },
  actions: {
    getRoles (req: GetRolesRequest, done: (roles: Array<Role>, error: boolean) => void) {
      doActionWithError<GetRolesRequest, GetRolesResponse>(
        API.GET_ROLES,
        req,
        req.Message,
        (resp: GetRolesResponse): void => {
          this.Roles.Roles.push(...resp.Infos)
          this.Roles.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    getRoleUsers (req: GetRoleUsersRequest, done: (roleUsers: Array<AppRoleUser>, error: boolean) => void) {
      doActionWithError<GetRoleUsersRequest, GetRoleUsersResponse>(
        API.GET_ROLEUSERS,
        req,
        req.Message,
        (resp: GetRoleUsersResponse): void => {
          const roleUsers = this.roleUsers(req.RoleID)
          roleUsers.push(...resp.Infos)
          this.RoleUsers.RoleUsers.set(req.RoleID, roleUsers)
          this.RoleUsers.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    createRoleUser (req: CreateRoleUserRequest, done: (roleUser: AppRoleUser, error: boolean) => void) {
      doActionWithError<CreateRoleUserRequest, CreateRoleUserResponse>(
        API.CREATE_ROLEUSER,
        req,
        req.Message,
        (resp: CreateRoleUserResponse): void => {
          const roleUsers = this.roleUsers(req.RoleID)
          roleUsers.push(resp.Info)
          this.RoleUsers.RoleUsers.set(req.RoleID, roleUsers)
          done(resp.Info, false)
        }, () => {
          done(undefined as unknown as AppRoleUser, true)
        })
    },
    deleteRoleUser (req: DeleteRoleUserRequest, done: (roleUser: RoleUserRelation, error: boolean) => void) {
      doActionWithError<DeleteRoleUserRequest, DeleteRoleUserResponse>(
        API.DELETE_ROLEUSER,
        req,
        req.Message,
        (resp: DeleteRoleUserResponse): void => {
          const roleUsers = this.roleUsers(resp.Info.RoleID)
          const index = roleUsers.findIndex((el) => el.UserID === resp.Info.UserID)
          roleUsers.splice(index, 1)
          this.RoleUsers.RoleUsers.set(resp.Info.RoleID, roleUsers)
          done(resp.Info, false)
        }, () => {
          done(undefined as unknown as RoleUserRelation, true)
        })
    }
  }
})
