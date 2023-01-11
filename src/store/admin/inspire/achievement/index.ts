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
      Archivements: new Map<string, Array<UserArchivement>>(),
      Total: 0
    }
  }),
  getters: {
    getArchivementByUserID () {
      return (userID: string) => {
        const data = this.Archivements.Archivements.get(userID)
        return !data? [] as Array<UserArchivement> : data
      }
    },
    inviteeArchivements () {
      return (userID: string) => {
        const data = this.getArchivementByUserID(userID)
        return data.filter((el) => el.InviterID === userID)
      } 
    },
    inviterArchivements () {
      return (userID: string) => {
        const data = this.getArchivementByUserID(userID)
        return data.filter((el) => el.InviterID !== userID)
      } 
    },
    getArchivement () {
      return (userID: string) => {
        return this.Archivements.Archivements.get(userID)
      }
    }
  },
  actions: {
    getUserGoodArchivements (req: GetUserGoodArchivementsRequest, key: string, done: (error: boolean, rows: Array<UserArchivement>) => void) {
      doActionWithError<GetUserGoodArchivementsRequest, GetUserGoodArchivementsResponse>(
        API.GET_USER_GOODARCHIVEMENTS,
        req,
        req.Message,
        (resp: GetUserGoodArchivementsResponse): void => {
          const data = this.getArchivementByUserID(key)
          data.push(...resp.Archivements)
          this.Archivements.Archivements.set(key, data)
          done(false, resp.Archivements)
        },
        () => {
          done(true, [] as Array<UserArchivement>)
        }
      )
    }
  }
})
