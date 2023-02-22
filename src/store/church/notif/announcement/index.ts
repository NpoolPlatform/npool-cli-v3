import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetNAppAnnouncementsRequest,
  GetNAppAnnouncementsResponse
} from './types'
import { doActionWithError } from '../../../action'
import { Announcement } from '../../../base'

export const useChurchAnnouncementStore = defineStore('church-announcement-v4', {
  state: () => ({
    Announcements: {
      Announcements: new Map<string, Array<Announcement>>(),
      Total: 0
    }
  }),
  getters: {
    getAnnouncementByAppID () {
      return (appID: string) => {
        const rows = this.Announcements.Announcements.get(appID)
        return !rows ? [] as Array<Announcement> : rows
      }
    },
    announcements () {
      return (appID: string) => {
        return this.getAnnouncementByAppID(appID).sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 0)
      }
    }
  },
  actions: {
    getAppAnnouncements (req: GetNAppAnnouncementsRequest, done: (error: boolean, rows: Array<Announcement>) => void) {
      doActionWithError<GetNAppAnnouncementsRequest, GetNAppAnnouncementsResponse>(
        API.GET_N_APP_ANNOUNCEMENTS,
        req,
        req.Message,
        (resp: GetNAppAnnouncementsResponse): void => {
          const rows = this.getAnnouncementByAppID(req.TargetAppID)
          rows.push(...resp.Infos)
          this.Announcements.Announcements.set(req.TargetAppID, rows)
          this.Announcements.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Announcement>)
        }
      )
    }
  }
})
