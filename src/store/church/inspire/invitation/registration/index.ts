import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetAppRegistrationsRequest,
  GetAppRegistrationsResponse
} from './types'
import { doActionWithError } from '../../../../action'
import { Registration } from '../../../../base'

export const useChurchRegistrationStore = defineStore('church-registration-v4', {
  state: () => ({
    Registrations: {
      Registrations: new Map<string, Array<Registration>>(),
      Total: 0
    }
  }),
  getters: {
    getRegistrationsByAppID () {
      return (appID: string) => {
        const data = this.Registrations.Registrations.get(appID)
        return !data ? [] as Array<Registration> : data
      }
    }
  },
  actions: {
    getAppRegistrations (req: GetAppRegistrationsRequest, done: (error: boolean, rows: Array<Registration>) => void) {
      doActionWithError<GetAppRegistrationsRequest, GetAppRegistrationsResponse>(
        API.GET_APP_REGISTRATIONINVITATIONS,
        req,
        req.Message,
        (resp: GetAppRegistrationsResponse): void => {
          const data = this.getRegistrationsByAppID(req.TargetAppID)
          data.push(...resp.Infos)
          this.Registrations.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Registration>)
        }
      )
    }
  }
})
