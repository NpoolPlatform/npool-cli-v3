import { defineStore } from 'pinia'
import { doActionWithError } from '../../../action'
import { Auth, AuthHistory } from '../../../base'
import { API } from './const'
import {
  ChurchAuthingState,
  CreateAppAuthRequest,
  CreateAppAuthResponse,
  DeleteAppAuthRequest,
  DeleteAppAuthResponse,
  GetAppAuthHistoriesRequest,
  GetAppAuthHistoriesResponse,
  GetAppAuthsRequest,
  GetAppAuthsResponse
} from './types'

export const useChurchAuthingStore = defineStore('church-authing-v3', {
  state: (): ChurchAuthingState => ({
    Auths: new Map<string, Array<Auth>>(),
    Histories: new Map<string, Array<AuthHistory>>()
  }),
  getters: {},
  actions: {
    getAppAuths (req: GetAppAuthsRequest, done: (auths: Array<Auth>, error: boolean) => void) {
      doActionWithError<GetAppAuthsRequest, GetAppAuthsResponse>(
        API.GET_APP_AUTHS,
        req,
        req.Message,
        (resp: GetAppAuthsResponse): void => {
          let auths = this.Auths.get(req.TargetAppID)
          if (!auths) {
            auths = []
          }
          auths.push(...resp.Infos)
          this.Auths.set(req.TargetAppID, auths)
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },

    createAppAuth (req: CreateAppAuthRequest, done: (auth: Auth, error: boolean) => void) {
      doActionWithError<CreateAppAuthRequest, CreateAppAuthResponse>(
        API.CREATE_APP_AUTH,
        req,
        req.Message,
        (resp: CreateAppAuthResponse): void => {
          let auths = this.Auths.get(req.TargetAppID)
          if (!auths) {
            auths = []
          }
          auths.splice(0, 0, resp.Info)
          this.Auths.set(req.TargetAppID, auths)
          done(resp.Info, false)
        }, () => {
          done(undefined as unknown as Auth, true)
        })
    },

    deleteAppAuth (req: DeleteAppAuthRequest, done: (auth: Auth, error: boolean) => void) {
      doActionWithError<DeleteAppAuthRequest, DeleteAppAuthResponse>(
        API.DELETE_APP_AUTH,
        req,
        req.Message,
        (resp: DeleteAppAuthResponse): void => {
          const auths = this.Auths.get(req.TargetAppID)
          if (!auths) {
            return
          }

          const index = auths.findIndex((el) => el.ID === req.ID)
          if (index < 0) {
            return
          }

          auths.splice(index, 1)
          this.Auths.set(req.TargetAppID, auths)
          done(resp.Info, false)
        }, () => {
          done(undefined as unknown as Auth, true)
        })
    },

    getAppAuthHistories (req: GetAppAuthHistoriesRequest, done: (histories: Array<AuthHistory>, error: boolean) => void) {
      doActionWithError<GetAppAuthHistoriesRequest, GetAppAuthHistoriesResponse>(
        API.GET_APP_AUTHHISTORIES,
        req,
        req.Message,
        (resp: GetAppAuthHistoriesResponse): void => {
          let histories = this.Histories.get(req.TargetAppID)
          if (!histories) {
            histories = []
          }
          histories.push(...resp.Infos)
          this.Histories.set(req.TargetAppID, histories)
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    }
  }
})
