import { defineStore } from 'pinia'
import { doActionWithError } from 'src/store/action'
import { API } from './const'
import {
  GoodArchivement,
  GetGoodArchivementsRequest,
  GetGoodArchivementsResponse
} from './types'

export const useAdminArchivementStore = defineStore('adarchivement', {
  state: () => ({
    Archivements: {
      Archivements: new Map<string, GoodArchivement>(),
      Total: 0
    }
  }),
  getters: {

  },
  actions: {
    getGoodArchivements (req: GetGoodArchivementsRequest, done: (error: boolean, count?: number) => void) {
      doActionWithError<GetGoodArchivementsRequest, GetGoodArchivementsResponse>(
        API.GET_USER_GOOD_ARCHIVEMENTS,
        req,
        req.Message,
        (resp: GetGoodArchivementsResponse): void => {
          resp.Archivements.forEach((el) => {
            this.Archivements.Archivements.set(el.UserID, el)
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
