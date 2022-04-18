import { defineStore } from 'pinia'
import { Application } from '../../frontend'
import { doActionWithError } from '../../action'
import { API } from './const'
import { ApplicationsState, GetApplicationsRequest, GetApplicationsResponse } from './types'

export const useApplicationsStore = defineStore('applications', {
  state: (): ApplicationsState => ({
    Applications: []
  }),
  getters: {
    getApplicationByID (): (appID: string) => Application {
      return (appID: string) => {
        const index = this.Applications.findIndex((el) => el.App.ID === appID)
        return index < 0 ? undefined as unknown as Application : this.Applications[index]
      }
    }
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
