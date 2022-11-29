import { defineStore } from 'pinia'
import { UserArchivement } from '../../../base'
import { doActionWithError } from '../../../action'
import { API } from './const'
import {
  GetUserGoodArchivementsRequest,
  GetUserGoodArchivementsResponse
} from './types'

export const useAdminArchivementStore = defineStore('admin-archivement-v4', {
  state: () => ({
    Archivements: {
      Archivements: new Map<string, UserArchivement>(),
      Total: 0
    }
  }),
  getters: {
    getArchivementByUserID () {
      return (userID: string) => {
        const data = this.Archivements.Archivements.get(userID)
        return !data? {} as UserArchivement : data
      }
    },
    getArchivement () {
      return (userID: string) => {
        return this.Archivements.Archivements.get(userID)
      }
    }
  },
  actions: {
    getUserGoodArchivements (req: GetUserGoodArchivementsRequest, done: (error: boolean, rows: Array<UserArchivement>,) => void) {
      doActionWithError<GetUserGoodArchivementsRequest, GetUserGoodArchivementsResponse>(
        API.GET_USER_GOODARCHIVEMENTS,
        req,
        req.Message,
        (resp: GetUserGoodArchivementsResponse): void => {
          resp.Archivements.forEach((el) => this.Archivements.Archivements.set(el.UserID, el))
          done(false, resp.Archivements)
        },
        () => {
          done(true, [] as Array<UserArchivement>)
        }
      )
    }
  }
})
