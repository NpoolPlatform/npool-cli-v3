import { defineStore } from 'pinia'
import {
  RegInvitation,
  UpdateRegInvitationRequest,
  UpdateRegInvitationResponse
} from '../../admin'
import {
  API as RegInvitationAPI
} from '../../admin/reginvitation/const'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { RegInvitationState } from './state'
import {
  GetAppRegInvitationsRequest,
  GetAppRegInvitationsResponse
} from './types'

export const useChurchRegInvitationStore = defineStore('churchreginvitation', {
  state: (): RegInvitationState => ({
    RegInvitations: new Map<string, Array<RegInvitation>>()
  }),
  getters: {},
  actions: {
    getRegInvitations (req: GetAppRegInvitationsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppRegInvitationsRequest, GetAppRegInvitationsResponse>(
        API.GET_REGISTRATION_INVITATIONS,
        req,
        req.Message,
        (resp: GetAppRegInvitationsResponse): void => {
          this.RegInvitations.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    updateRegInvitation (req: UpdateRegInvitationRequest, done: () => void) {
      doAction<UpdateRegInvitationRequest, UpdateRegInvitationResponse>(
        RegInvitationAPI.UPDATE_REGISTRATION_INVITATION,
        req,
        req.Message,
        (resp: UpdateRegInvitationResponse): void => {
          let regs = this.RegInvitations.get(req.Info.AppID)
          if (!regs) {
            regs = []
          }
          const index = regs.findIndex((el) => el.ID === req.Info.ID)
          regs.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          this.RegInvitations.set(req.Info.AppID, regs)
          done()
        })
    }
  }
})

export * from './types'
