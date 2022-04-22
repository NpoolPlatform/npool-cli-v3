import { defineStore } from 'pinia'
import { InvitationCode } from '../../frontend'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { InvitationState } from './state'
import {
  CreateAppInvitationCodeRequest,
  CreateAppInvitationCodeResponse,
  GetAppInvitationCodesRequest,
  GetAppInvitationCodesResponse
} from './types'

export const useChurchInvitationStore = defineStore('churchinvitation', {
  state: (): InvitationState => ({
    InvitationCodes: new Map<string, Array<InvitationCode>>()
  }),
  getters: {},
  actions: {
    getInvitationCodes (req: GetAppInvitationCodesRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppInvitationCodesRequest, GetAppInvitationCodesResponse>(
        API.GET_INVITATION_CODES,
        req,
        req.Message,
        (resp: GetAppInvitationCodesResponse): void => {
          this.InvitationCodes.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    createInvitationCode (req: CreateAppInvitationCodeRequest, done: () => void) {
      doAction<CreateAppInvitationCodeRequest, CreateAppInvitationCodeResponse>(
        API.CREATE_INVITATION_CODE,
        req,
        req.Message,
        (resp: CreateAppInvitationCodeResponse): void => {
          let amounts = this.InvitationCodes.get(req.TargetAppID)
          if (!amounts) {
            amounts = []
          }
          amounts.push(resp.Info)
          this.InvitationCodes.set(req.TargetAppID, amounts)
          done()
        })
    }
  }
})

export * from './types'
