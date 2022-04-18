import { defineStore } from 'pinia'
import { doActionWithError } from '../../action'
import { API } from './const'
import { APIState, ExpandAPI, GetAPIsRequest, GetAPIsResponse } from './types'

export const useAPIStore = defineStore('apis', {
  state: (): APIState => ({
    APIs: []
  }),
  getters: {},
  actions: {
    getAPIs (req: GetAPIsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAPIsRequest, GetAPIsResponse>(
        API.GET_APIS,
        req,
        req.Message,
        (resp: GetAPIsResponse): void => {
          this.APIs = []
          resp.Infos.forEach((api) => {
            const lapi = api as unknown as ExpandAPI
            lapi.Domains = api.Domains.join(',')
            this.APIs.push(lapi)
          })
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
