import { defineStore } from 'pinia'
import { doActionWithError } from '../../action'
import { API } from './const'
import {
  GetUserGoodCommissionsRequest,
  GetUserGoodCommissionsResponse,
  GetUserReferralsRequest,
  GetUserReferralsResponse,
  AdminInspireState,
} from './types'

export const useAdminInspireStore = defineStore('admininspire', {
  state: (): AdminInspireState => ({
    Referrals: [],
    GoodCommissions: [],
  }),
  getters: {},
  actions: {
    getUserReferrals (req: GetUserReferralsRequest, done: (error: boolean) => void) {
      doActionWithError<GetUserReferralsRequest, GetUserReferralsResponse>(
        API.GET_USER_REFERRALS,
        req,
        req.Message,
        (resp: GetUserReferralsResponse): void => {
          this.Referrals = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    getUserGoodCommissions (req: GetUserGoodCommissionsRequest, done: (error: boolean) => void) {
      doActionWithError<GetUserGoodCommissionsRequest, GetUserGoodCommissionsResponse>(
        API.GET_USER_GOOD_COMMISSIONS,
        req,
        req.Message,
        (resp: GetUserGoodCommissionsResponse): void => {
          this.GoodCommissions = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
  }
})

export * from './types'
