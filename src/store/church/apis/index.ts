import { defineStore } from 'pinia'
import { doActionWithError } from '../../action'
import { API } from './const'
import { APIState, GetAPIsRequest, GetAPIsResponse } from './types'

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
          this.APIs = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
