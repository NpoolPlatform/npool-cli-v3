import { defineStore } from 'pinia'
import { doActionWithError } from 'src/store/action'
import { API } from './const'
import {
  GoodArchivement,
  GetGoodArchivementsRequest,
  GetGoodArchivementsResponse
} from './types'

export const useArchivementStore = defineStore('archivement', {
  state: () => ({
    Archivements: {
      Archivements: [] as Array<GoodArchivement>,
      Total: 0
    }
  }),
  getters: {},
  actions: {
    getGoodArchivements (req: GetGoodArchivementsRequest, done: (error: boolean, count?: number) => void) {
      doActionWithError<GetGoodArchivementsRequest, GetGoodArchivementsResponse>(
        API.GET_GOOD_ARCHIVEMENTS,
        req,
        req.Message,
        (resp: GetGoodArchivementsResponse): void => {
          resp.Archivements.forEach((el) => {
            const index = this.Archivements.Archivements.findIndex((ael) => ael.UserID === el.UserID)
            this.Archivements.Archivements.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, el)
          })
          this.Archivements.Total = resp.Total
          done(false, resp.Archivements.length)
        },
        () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'
