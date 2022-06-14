import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import {
  GetRegInvitationsRequest,
  GetRegInvitationsResponse,
  RegInvitationState,
  UpdateRegInvitationRequest,
  UpdateRegInvitationResponse
} from './types'

export const useRegInvitationStore = defineStore('reginvitation', {
  state: (): RegInvitationState => ({
    RegInvitations: []
  }),
  getters: {},
  actions: {
    getRegInvitations (req: GetRegInvitationsRequest, done: (error: boolean) => void) {
      doActionWithError<GetRegInvitationsRequest, GetRegInvitationsResponse>(
        API.GET_REGISTRATION_INVITATIONS,
        req,
        req.Message,
        (resp: GetRegInvitationsResponse): void => {
          this.RegInvitations = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    updateRegInvitation (req: UpdateRegInvitationRequest, done: () => void) {
      doAction<UpdateRegInvitationRequest, UpdateRegInvitationResponse>(
        API.UPDATE_REGISTRATION_INVITATION,
        req,
        req.Message,
        (resp: UpdateRegInvitationResponse): void => {
          const index = this.RegInvitations.findIndex((el) => el.ID === req.Info.ID)
          this.RegInvitations.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    }
  }
})

export * from './types'
