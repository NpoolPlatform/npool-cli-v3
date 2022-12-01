import { defineStore } from 'pinia'
import { UserArchivement } from '../../../base'
import { doActionWithError } from '../../../action'
import { API } from './const'
import {
  GetGoodArchivementsRequest,
  GetGoodArchivementsResponse
} from './types'

export const useFrontendArchivementStore = defineStore('frontend-archivement-v4', {
  state: () => ({
    Archivements: {
      Archivements: [] as Array<UserArchivement>,
      Total: 0
    }
  }),
  getters: {
    getArchivementByUserID () {
      return (userID: string) => this.Archivements.Archivements.find((el) => el.UserID === userID)
    },
    getInviteesArchivements () {
      return (userID: string) => this.Archivements.Archivements.filter((el) => el.UserID !== userID && el.Kol)
    },
    getInviterGoodPercent() {
      return (archivement: UserArchivement, goodID: string) => {
        const good = archivement.Archivements.find((el) => el.GoodID === goodID)
        return !good? 0 : good.CommissionPercent 
      }
    },
    subUsername() {
      return (archivement: UserArchivement) => {
        return archivement.EmailAddress.length > 0 ? archivement.EmailAddress : archivement.PhoneNO
      }
    }
  },
  actions: {
    getGoodArchivements (req: GetGoodArchivementsRequest, done: (error: boolean, rows: Array<UserArchivement>,) => void) {
      doActionWithError<GetGoodArchivementsRequest, GetGoodArchivementsResponse>(
        API.GET_GOODARCHIVEMENTS,
        req,
        req.Message,
        (resp: GetGoodArchivementsResponse): void => {
          this.Archivements.Archivements.push(...resp.Archivements)
          done(false, resp.Archivements)
        },
        () => {
          done(true, [] as Array<UserArchivement>)
        }
      )
    }
  }
})
