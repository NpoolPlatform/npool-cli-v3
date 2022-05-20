import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import {
  CreateRoleRequest,
  CreateRoleResponse,
  CreateRoleUserRequest,
  CreateRoleUserResponse,
  DeleteRoleUserRequest,
  DeleteRoleUserResponse,
  GetRolesRequest,
  GetRolesResponse,
  GetRoleUsersRequest,
  GetRoleUsersResponse,
  RoleState
} from './types'

export const useRoleStore = defineStore('role', {
  state: (): RoleState => ({
    Roles: [],
    RoleUsers: []
  }),
  getters: {},
  actions: {
    createRole (req: CreateRoleRequest, done: () => void) {
      doAction<CreateRoleRequest, CreateRoleResponse>(
        API.CREATE_ROLE,
        req,
        req.Message,
        (resp: CreateRoleResponse): void => {
          this.Roles.splice(0, 0, resp.Info)
          done()
        })
    },
    getRoles (req: GetRolesRequest, done: (error: boolean) => void) {
      doActionWithError<GetRolesRequest, GetRolesResponse>(
        API.GET_ROLES,
        req,
        req.Message,
        (resp: GetRolesResponse): void => {
          this.Roles = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    getRoleUsers (req: GetRoleUsersRequest, done: (error: boolean) => void) {
      doActionWithError<GetRoleUsersRequest, GetRoleUsersResponse>(
        API.GET_ROLE_USERS,
        req,
        req.Message,
        (resp: GetRoleUsersResponse): void => {
          this.RoleUsers = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    createRoleUser (req: CreateRoleUserRequest, done: () => void) {
      doAction<CreateRoleUserRequest, CreateRoleUserResponse>(
        API.CREATE_ROLE_USER,
        req,
        req.Message,
        (resp: CreateRoleUserResponse): void => {
          this.RoleUsers.splice(0, 0, resp.Info)
          done()
        })
    },
    deleteRoleUser (req: DeleteRoleUserRequest, done: () => void) {
      doAction<DeleteRoleUserRequest, DeleteRoleUserResponse>(
        API.DELETE_ROLE_USER,
        req,
        req.Message,
        (resp: DeleteRoleUserResponse): void => {
          const index = this.RoleUsers.findIndex((el) => el.ID === resp.Info.ID)
          if (index >= 0) {
            this.RoleUsers.splice(index, 1)
          }
          done()
        })
    }
  }
})

export * from './types'
