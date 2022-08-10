import { defineStore } from 'pinia'
import { doActionWithError } from '../../../action'
import { API } from './const'
import {
  Archivement,
  GetArchivementRequest,
  GetArchivementResponse,
} from './types'

export const useArchivementStore = defineStore('archivement', {
  state: (): GetArchivementResponse => ({
    Archivements: [] as Array<Archivement>,
    Total: 0,
  }),
  getters: {},
  actions: {
    getCoinArchivements(req: GetArchivementRequest,done: (error: boolean) => void) {
      doActionWithError<GetArchivementRequest, GetArchivementResponse>(
        API.GET_COIN_ARCHIVEMENT,
        req,
        req.Message,
        (resp: GetArchivementResponse): void => {
          this.Archivements = resp.Archivements
          this.Total = resp.Total
          done(false)
        },
        () => {
          done(true)
        }
      )
    },
  },
})

export * from './types'
