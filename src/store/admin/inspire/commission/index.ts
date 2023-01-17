import { defineStore } from 'pinia'
import { API } from './const'
import {
  UpdateCommissionRequest,
  UpdateCommissionResponse,
  GetAppCommissionsRequest,
  GetAppCommissionsResponse,
  CreateUserCommissionRequest,
  CreateUserCommissionResponse,
  CloneCommissionsRequest,
  CloneCommissionsResponse
} from './types'
import { doActionWithError } from '../../../action'
import { Commission } from '../../../base'

export const useAdminCommissionStore = defineStore('admin-commission-v4', {
  state: () => ({
    Commissions: {
      Commissions: [] as Array<Commission>,
      Total: 0
    }
  }),
  getters: {
  },
  actions: {
    getAppCommissions (req: GetAppCommissionsRequest, done: (error: boolean, rows: Array<Commission>) => void) {
      doActionWithError<GetAppCommissionsRequest, GetAppCommissionsResponse>(
        API.GET_APP_COMMISSIONS,
        req,
        req.Message,
        (resp: GetAppCommissionsResponse): void => {
          this.Commissions.Commissions.push(...resp.Infos)
          this.Commissions.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Commission>)
        }
      )
    },
    updateCommission (req: UpdateCommissionRequest, done: (error: boolean, row: Commission) => void) {
      doActionWithError<UpdateCommissionRequest, UpdateCommissionResponse>(
        API.UPDATE_COMMISSION,
        req,
        req.Message,
        (resp: UpdateCommissionResponse): void => {
          const index = this.Commissions.Commissions.findIndex((el) => el.UserID === resp.Info.UserID)
          this.Commissions.Commissions.splice(index, 1, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Commission)
        }
      )
    },
    createUserCommission (req: CreateUserCommissionRequest, done: (error: boolean, row: Commission) => void) {
      doActionWithError<CreateUserCommissionRequest, CreateUserCommissionResponse>(
        API.CREATE_USER_COMMISSION,
        req,
        req.Message,
        (resp: CreateUserCommissionResponse): void => {
          this.Commissions.Commissions.push(resp.Info)
          this.Commissions.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as Commission)
        }
      )
    },
    cloneCommissions (req: CloneCommissionsRequest, done: (error: boolean, row: Commission) => void) {
      doActionWithError<CloneCommissionsRequest, CloneCommissionsResponse>(
        API.CLONE_COMMISSIONS,
        req,
        req.Message,
        (resp: CloneCommissionsResponse): void => {
          const index = this.Commissions.Commissions.findIndex((el) => el.UserID === resp.Info.UserID)
          this.Commissions.Commissions.splice(index, 1, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, {} as Commission)
        }
      )
    },
  }
})
