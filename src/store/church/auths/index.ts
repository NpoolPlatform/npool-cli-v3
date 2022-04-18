import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { Auth, AuthState, CreateAppAuthRequest, CreateAppAuthResponse, CreateAppRoleAuthRequest, CreateAppRoleAuthResponse, CreateAppUserAuthRequest, CreateAppUserAuthResponse, DeleteAppAuthRequest, DeleteAppRoleAuthRequest, DeleteAppRoleAuthResponse, DeleteAppUserAuthRequest, DeleteAppUserAuthResponse, GetAuthHistoriesRequest, GetAuthHistoriesResponse, GetAuthsRequest, GetAuthsResponse } from './types'

export const useAuthStore = defineStore('auths', {
  state: (): AuthState => ({
    AppAuths: new Map<string, Array<Auth>>(),
    UserAuths: new Map<string, Array<Auth>>(),
    RoleAuths: new Map<string, Array<Auth>>(),
    Histories: []
  }),
  getters: {},
  actions: {
    getAuths (req: GetAuthsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAuthsRequest, GetAuthsResponse>(
        API.GET_AUTHS,
        req,
        req.Message,
        (resp: GetAuthsResponse): void => {
          let auths = [] as Array<Auth>
          resp.Infos.forEach((auth) => {
            if (auth.RoleID === '' && auth.UserID === '') {
              auths.push(auth)
            }
          })
          this.AppAuths.set(req.TargetAppID, auths)

          auths = [] as Array<Auth>
          resp.Infos.forEach((auth) => {
            if (auth.UserID === '') {
              return
            }
            auths.push(auth)
          })
          if (auths.length > 0) {
            this.UserAuths.set(req.TargetAppID, auths)
          }

          auths = [] as Array<Auth>
          resp.Infos.forEach((auth) => {
            if (auth.RoleID === '') {
              return
            }
            auths.push(auth)
          })
          if (auths.length > 0) {
            this.RoleAuths.set(req.TargetAppID, auths)
          }

          done(false)
        }, () => {
          done(true)
        })
    },
    createAppAuth (req: CreateAppAuthRequest, done: () => void) {
      doAction<CreateAppAuthRequest, CreateAppAuthResponse>(
        API.CREATE_APP_AUTH,
        req,
        req.Message,
        (resp: CreateAppAuthResponse): void => {
          let auths = this.AppAuths.get(req.TargetAppID)
          if (!auths) {
            auths = []
          }
          auths.push(resp.Info)
          this.AppAuths.set(req.TargetAppID, auths)
          done()
        })
    },
    createAppUserAuth (req: CreateAppUserAuthRequest, done: () => void) {
      doAction<CreateAppUserAuthRequest, CreateAppUserAuthResponse>(
        API.CREATE_APP_USER_AUTH,
        req,
        req.Message,
        (resp: CreateAppUserAuthResponse): void => {
          let auths = this.UserAuths.get(req.TargetAppID)
          if (!auths) {
            auths = []
          }
          auths.push(resp.Info)
          this.UserAuths.set(req.TargetAppID, auths)
          done()
        })
    },
    createAppRoleAuth (req: CreateAppRoleAuthRequest, done: () => void) {
      doAction<CreateAppRoleAuthRequest, CreateAppRoleAuthResponse>(
        API.CREATE_APP_ROLE_AUTH,
        req,
        req.Message,
        (resp: CreateAppUserAuthResponse): void => {
          let auths = this.RoleAuths.get(req.TargetAppID)
          if (!auths) {
            auths = []
          }
          auths.push(resp.Info)
          this.RoleAuths.set(req.TargetAppID, auths)
          done()
        })
    },
    deleteAppAuth (req: DeleteAppAuthRequest, done: () => void) {
      doAction<DeleteAppAuthRequest, DeleteAppAuthRequest>(
        API.DELETE_APP_AUTH,
        req,
        req.Message,
        (): void => {
          for (const [k, v] of this.AppAuths) {
            const index = v.findIndex((el) => el.ID == req.ID)
            if (index < 0) {
              continue
            }
            v.splice(index, 1)
            this.AppAuths.set(k, v)
            return
          }
          done()
        })
    },
    deleteAppUserAuth (req: DeleteAppUserAuthRequest, done: () => void) {
      doAction<DeleteAppUserAuthRequest, DeleteAppUserAuthResponse>(
        API.DELETE_APP_USER_AUTH,
        req,
        req.Message,
        (): void => {
          for (const [k, v] of this.UserAuths) {
            const index = v.findIndex((el) => el.ID == req.ID)
            if (index < 0) {
              continue
            }
            v.splice(index, 1)
            this.AppAuths.set(k, v)
            return
          }
          done()
        })
    },
    deleteAppRoleAuth (req: DeleteAppRoleAuthRequest, done: () => void) {
      doAction<DeleteAppRoleAuthRequest, DeleteAppRoleAuthResponse>(
        API.DELETE_APP_ROLE_AUTH,
        req,
        req.Message,
        (): void => {
          for (const [k, v] of this.RoleAuths) {
            const index = v.findIndex((el) => el.ID == req.ID)
            if (index < 0) {
              continue
            }
            v.splice(index, 1)
            this.AppAuths.set(k, v)
            return
          }
          done()
        })
    },
    getAuthHistories (req: GetAuthHistoriesRequest, done: (error: boolean) => void) {
      doActionWithError<GetAuthHistoriesRequest, GetAuthHistoriesResponse>(
        API.GET_AUTH_HISTORIES,
        req,
        req.Message,
        (resp: GetAuthHistoriesResponse): void => {
          this.Histories = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
