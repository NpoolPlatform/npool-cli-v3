import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetAppInvitationCodesRequest,
  GetAppInvitationCodesResponse
} from './types'
import { InvitationCode } from '../../../../base'
import { doActionWithError } from '../../../../action'

export const useChurchInvitationCodeStore = defineStore('church-invitationcode-v4', {
  state: () => ({
    InvitationCodes: {
      InvitationCodes: new Map<string, Array<InvitationCode>>(),
      Total: 0
    }
  }),
  getters: {
    getInvitationCodesByAppID () {
      return (appID: string) => {
        const data = this.InvitationCodes.InvitationCodes.get(appID)
        return !data ? [] as Array<InvitationCode> : data
      }
    }
  },
  actions: {
    getAppInvitationCodes (req: GetAppInvitationCodesRequest, done: (error: boolean, rows: Array<InvitationCode>) => void) {
      doActionWithError<GetAppInvitationCodesRequest, GetAppInvitationCodesResponse>(
        API.GET_APP_INVITATIONCODES,
        req,
        req.Message,
        (resp: GetAppInvitationCodesResponse): void => {
          const data = this.getInvitationCodesByAppID(req.TargetAppID)
          data.push(...resp.Infos)
          this.InvitationCodes.InvitationCodes.set(req.TargetAppID, data)
          this.InvitationCodes.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<InvitationCode>)
        }
      )
    }
  }
})
