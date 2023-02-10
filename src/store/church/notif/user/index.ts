import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetNAppAnnouncementUsersRequest,
  GetNAppAnnouncementUsersResponse
} from './types'
import { doActionWithError } from '../../../action'
import { AnnouncementUser } from '../../../base'

export const useChurchAnnouncementUserStore = defineStore('church-announcementuser-v4', {
  state: () => ({
    AnnouncementUsers: {
      AnnouncementUsers: new Map<string, Array<AnnouncementUser>>(),
      Total: 0
    }
  }),
  getters: {
    getAnnouncementUserByAppID () {
      return (appID: string) => {
        const rows = this.AnnouncementUsers.AnnouncementUsers.get(appID)
        return !rows ? [] as Array<AnnouncementUser> : rows
      }
    },
    getAnnouncementUsersByID () {
      return (appID: string, id: string) => {
        const rows = this.getAnnouncementUserByAppID(appID)
        return rows.filter((el) =>
          el.AnnouncementID?.toLowerCase().includes(id) ||
          el.EmailAddress?.toLowerCase().includes(id) ||
          el.PhoneNO?.toLowerCase().includes(id)
        )
      }
    }
  },
  actions: {
    getAppAnnouncementUsers (req: GetNAppAnnouncementUsersRequest, done: (error: boolean, rows: Array<AnnouncementUser>) => void) {
      doActionWithError<GetNAppAnnouncementUsersRequest, GetNAppAnnouncementUsersResponse>(
        API.GET_N_APP_ANNOUNCEMENTUSERS,
        req,
        req.Message,
        (resp: GetNAppAnnouncementUsersResponse): void => {
          const rows = this.getAnnouncementUserByAppID(req.TargetAppID)
          rows.push(...resp.Infos)
          this.AnnouncementUsers.AnnouncementUsers.set(req.TargetAppID, rows)
          this.AnnouncementUsers.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<AnnouncementUser>)
        }
      )
    }
  }
})
