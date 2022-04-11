import { defineStore } from 'pinia'
import { doAction } from '../action'
import { API } from './const'
import { Application, ApplicationState, GetApplicationRequest, GetApplicationResponse } from './types'

export const useCoinStore = defineStore('application', {
  state: (): ApplicationState => ({
    Application: undefined as unknown as Application
  }),
  getters: {
    },
  actions: {
    getApplication (req: GetApplicationRequest, done: () => void) {
      doAction<GetApplicationRequest, GetApplicationResponse>(
        API.GET_APPLICATION,
        req,
        req.Message,
        (resp: GetApplicationResponse): void => {
          this.Application = resp.Info
          done()
        })
    }
  }
})

export * from './types'
