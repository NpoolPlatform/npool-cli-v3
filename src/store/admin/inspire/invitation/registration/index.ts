import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetRegistrationsRequest,
  GetRegistrationsResponse,
  UpdateRegistrationRequest,
  UpdateRegistrationResponse
} from './types'
import { doActionWithError } from '../../../../action'
import { Registration } from '../../../../base'

export const useAdminRegistrationStore = defineStore('admin-registration-v4', {
  state: () => ({
    Registrations: {
      Registrations: [] as Array<Registration>,
      Total: 0
    }
  }),
  getters: {
    inviteeIDs () { // include self
      return (userID: string) => {
        const _ids = this.Registrations.Registrations.filter((el) => el.InviterID === userID).map((el) => el.InviteeID)
        return _ids.push(userID)
      }
    }
  },
  actions: {
    getRegistrations (req: GetRegistrationsRequest, done: (error: boolean, rows: Array<Registration>) => void) {
      doActionWithError<GetRegistrationsRequest, GetRegistrationsResponse>(
        API.GET_REGISTRATIONINVITATIONS,
        req,
        req.Message,
        (resp: GetRegistrationsResponse): void => {
          this.Registrations.Registrations.push(...resp.Infos)
          this.Registrations.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Registration>)
        }
      )
    },
    updateRegistration (req: UpdateRegistrationRequest, done: (error: boolean, row: Registration) => void) {
      doActionWithError<UpdateRegistrationRequest, UpdateRegistrationResponse>(
        API.UPDATE_REGISTRATIONINVITATION,
        req,
        req.Message,
        (resp: UpdateRegistrationResponse): void => {
          this.Registrations.Registrations.push(resp.Info)
          this.Registrations.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as Registration)
        }
      )
    }
  }
})
