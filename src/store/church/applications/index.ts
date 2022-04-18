import { defineStore } from 'pinia'
import { doActionWithError } from '../../action'
import { API } from './const'
import { ApplicationsState, GetApplicationsRequest, GetApplicationsResponse } from './types'

export const useApplicationsStore = defineStore('applications', {
  state: (): ApplicationsState => ({
    Applications: []
  }),
  getters: {
    },
  actions: {
    getApplications (req: GetApplicationsRequest, done: (error: boolean) => void) {
      doActionWithError<GetApplicationsRequest, GetApplicationsResponse>(
        API.GET_APPLICATIONS,
        req,
        req.Message,
        (resp: GetApplicationsResponse): void => {
          this.Applications = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
