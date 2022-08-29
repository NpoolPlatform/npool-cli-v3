import { defineStore } from 'pinia'
import { doActionWithError } from '../../../action'
import { Role } from '../../../base'
import { API } from './const'
import {
  ChurchRoleState,
  CreateAppRoleRequest,
  CreateAppRoleResponse,
  GetAppRolesRequest,
  GetAppRolesResponse,
} from './types'

export const useChurchRoleStore = defineStore('church-role-v3', {
  state: (): ChurchRoleState => ({
    Roles: new Map<string, Array<Role>>()
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
    }
  }
})
