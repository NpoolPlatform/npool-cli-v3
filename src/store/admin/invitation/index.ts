import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { InvitationState } from './state'
import {
  CreateInvitationCodeRequest,
  CreateInvitationCodeResponse,
  GetInvitationCodesRequest,
  GetInvitationCodesResponse
} from './types'

export const useInvitationStore = defineStore('invitation', {
  state: (): InvitationState => ({
    InvitationCodes: []
  }),
  getters: {},
  actions: {
    getInvitationCodes (req: GetInvitationCodesRequest, done: (error: boolean) => void) {
      doActionWithError<GetInvitationCodesRequest, GetInvitationCodesResponse>(
        API.GET_INVITATION_CODES,
        req,
        req.Message,
        (resp: GetInvitationCodesResponse): void => {
          this.InvitationCodes = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    createInvitationCode (req: CreateInvitationCodeRequest, done: () => void) {
      doAction<CreateInvitationCodeRequest, CreateInvitationCodeResponse>(
        API.CREATE_INVITATION_CODE,
        req,
        req.Message,
        (resp: CreateInvitationCodeResponse): void => {
          this.InvitationCodes.push(resp.Info)
          done()
        })
    }
  }
})

export * from './types'
