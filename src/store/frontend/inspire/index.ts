import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import {
  GetGoodCommissionsRequest,
  GetGoodCommissionsResponse,
  GetInvitationCodeRequest,
  GetInvitationCodeResponse,
  GetPurchaseAmountSettingsRequest,
  GetPurchaseAmountSettingsResponse,
  GetReferralsRequest,
  GetReferralsResponse,
  InspireState,
  InvitationCode
} from './types'

export const useInspireStore = defineStore('inspire', {
  state: (): InspireState => ({
    InvitationCode: {} as InvitationCode,
    Referrals: [],
    GoodCommissions: [],
    PurchaseAmountSettings: []
  }),
  getters: {},
  actions: {
    getInvitationCode (req: GetInvitationCodeRequest, done?: () => void) {
      doAction<GetInvitationCodeRequest, GetInvitationCodeResponse>(
        API.GET_INVITATION_CODE,
        req,
        req.Message,
        (resp: GetInvitationCodeResponse): void => {
          this.InvitationCode = resp.Info
          done?.()
        })
    },
    getReferrals (req: GetReferralsRequest, done: (error: boolean) => void) {
      doActionWithError<GetReferralsRequest, GetReferralsResponse>(
        API.GET_REFERRALS,
        req,
        req.Message,
        (resp: GetReferralsResponse): void => {
          this.Referrals = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    getGoodCommissions (req: GetGoodCommissionsRequest, done: (error: boolean) => void) {
      doActionWithError<GetGoodCommissionsRequest, GetGoodCommissionsResponse>(
        API.GET_GOOD_COMMISSIONS,
        req,
        req.Message,
        (resp: GetGoodCommissionsResponse): void => {
          this.GoodCommissions = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    getPurchaseAmountSettings (req: GetPurchaseAmountSettingsRequest, done: () => void) {
      doAction<GetPurchaseAmountSettingsRequest, GetPurchaseAmountSettingsResponse>(
        API.GET_PURCHASE_AMOUNT_SETTINGS,
        req,
        req.Message,
        (resp: GetPurchaseAmountSettingsResponse): void => {
          this.PurchaseAmountSettings = resp.Infos
          done()
        })
    }
  }
})

export * from './types'
