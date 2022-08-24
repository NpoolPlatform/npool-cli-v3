import { defineStore } from 'pinia'
import { doActionWithError } from '../../../action'
import { App, Auth, Role, User } from '../../../base'
import { API } from './const'
import {
  AuthorizeGenesisRequest,
  AuthorizeGenesisResponse,
  CreateAdminAppsRequest,
  CreateAdminAppsResponse,
  CreateGenesisRolesRequest,
  CreateGenesisRolesResponse,
  CreateGenesisUserRequest,
  CreateGenesisUserResponse,
  GetAdminAppsRequest,
  GetAdminAppsResponse,
  GetGenesisAuthsRequest,
  GetGenesisAuthsResponse,
  GetGenesisRolesRequest,
  GetGenesisRolesResponse,
  GetGenesisUsersRequest,
  GetGenesisUsersResponse
} from './types'

export const useGenesisAdminStore = defineStore('genesis-admin-v3', {
  state: () => ({
    Apps: [] as Array<App>,
    Users: [] as Array<User>,
    Roles: [] as Array<Role>,
    Auths: new Map<string, Array<Auth>>()
  }),
  getters: {
    auths (): (appID: string) => Array<Auth> | undefined {
      return (appID: string) => {
        return this.Auths.get(appID)
      }
    }
  },
  actions: {
    getAdminApps (req: GetAdminAppsRequest, done: (apps: Array<App>, error: boolean) => void) {
      doActionWithError<GetAdminAppsRequest, GetAdminAppsResponse>(
        API.GET_ADMINAPPS,
        req,
        req.Message,
        (resp: GetAdminAppsResponse): void => {
          this.Apps = resp.Infos
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },

    createAdminApps (req: CreateAdminAppsRequest, done: (apps: Array<App>, error: boolean) => void) {
      doActionWithError<CreateAdminAppsRequest, CreateAdminAppsResponse>(
        API.CREATE_ADMINAPPS,
        req,
        req.Message,
        (resp: CreateAdminAppsResponse): void => {
          this.Apps = resp.Infos
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },

    getGenesisRoles (req: GetGenesisRolesRequest, done: (apps: Array<Role>, error: boolean) => void) {
      doActionWithError<GetGenesisRolesRequest, GetGenesisRolesResponse>(
        API.GET_GENESISROLES,
        req,
        req.Message,
        (resp: GetGenesisRolesResponse): void => {
          this.Roles = resp.Infos
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },

    createGenesisRoles (req: CreateGenesisRolesRequest, done: (roles: Array<Role>, error: boolean) => void) {
      doActionWithError<CreateGenesisRolesRequest, CreateGenesisRolesResponse>(
        API.CREATE_GENESISROLES,
        req,
        req.Message,
        (resp: CreateGenesisRolesResponse): void => {
          this.Roles = resp.Infos
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },

    getGenesisUsers (req: GetGenesisUsersRequest, done: (users: Array<User>, error: boolean) => void) {
      doActionWithError<GetGenesisUsersRequest, GetGenesisUsersResponse>(
        API.GET_GENESISUSERS,
        req,
        req.Message,
        (resp: GetGenesisUsersResponse): void => {
          this.Users = resp.Infos
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },

    createGenesisUser (req: CreateGenesisUserRequest, done: (user: User, error: boolean) => void) {
      doActionWithError<CreateGenesisUserRequest, CreateGenesisUserResponse>(
        API.CREATE_GENESISUSER,
        req,
        req.Message,
        (resp: CreateGenesisUserResponse): void => {
          this.Users.push(resp.Info)
          done(resp.Info, false)
        }, () => {
          done(undefined as unknown as User, true)
        })
    },

    getGenesisAuths (req: GetGenesisAuthsRequest, done: (auths: Array<Auth>, error: boolean) => void) {
      doActionWithError<GetGenesisAuthsRequest, GetGenesisAuthsResponse>(
        API.GET_GENESISAUTHS,
        req,
        req.Message,
        (resp: GetGenesisAuthsResponse): void => {
          this.Auths.set(req.TargetAppID, resp.Infos)
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },

    authorizeGenesis (req: AuthorizeGenesisRequest, done: (auths: Array<Auth>, error: boolean) => void) {
      doActionWithError<AuthorizeGenesisRequest, AuthorizeGenesisResponse>(
        API.AUTHORIZE_GENESIS,
        req,
        req.Message,
        (resp: AuthorizeGenesisResponse): void => {
          resp.Infos.forEach((info: Auth) => {
            let infos = this.Auths.get(info.AppID)
            if (!infos) {
              infos = [] as Array<Auth>
            }
            this.Auths.set(info.AppID, resp.Infos)
          })
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    }
  }
})

export * from './const'
export * from './types'
