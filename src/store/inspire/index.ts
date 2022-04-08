import { defineStore } from 'pinia'
import { doAction } from '../action'
import { API } from './const'
import {
  GetInvitationCodeRequest,
  GetInvitationCodeResponse,
  GetReferralsRequest,
  GetReferralsResponse,
  InspireState,
  InvitationCode
} from './types'

export const useInspireStore = defineStore('inspire', {
  state: (): InspireState => ({
    InvitationCode: {} as InvitationCode,
    Referrals: []
  }),
  getters: {},
  actions: {
    getInvitationCode (req: GetInvitationCodeRequest) {
      doAction<GetInvitationCodeRequest, GetInvitationCodeResponse>(
        API.GET_INVITATION_CODE,
        req,
        req.Message,
        (resp: GetInvitationCodeResponse): void => {
          this.InvitationCode = resp.Info
        })
    },
    getReferrals (req: GetReferralsRequest) {
      doAction<GetReferralsRequest, GetReferralsResponse>(
        API.GET_REFERRALS,
        req,
        req.Message,
        (resp: GetReferralsResponse): void => {
          this.Referrals = resp.Infos
        })
    }
  }
})

export * from './types'
