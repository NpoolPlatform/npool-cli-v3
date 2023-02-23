import { defineStore } from 'pinia'
import { Notif } from '../../../base'
import { doActionWithError } from '../../../action'
import { API } from './const'

import {
  GetAppNotifsRequest,
  GetAppNotifsResponse,
} from './types'

export const useAdminNotifStore = defineStore('admin-notif-v4', {
  state: () => ({
    Notifs: {
      Notifs: [] as Array<Notif>,
      Total: 0
    }
  }),
  getters: {
    getNotifByID (): (id: string) => Notif {
      return (id: string) => {
        const data = this.Notifs.Notifs.find((el) => el.ID === id)
        return !data ? {} as Notif : data
      }
    },
    unReads () : Array<Notif> {
      return this.Notifs.Notifs.filter((el) => !el.Notified).sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 0)
    },
    notifs () : Array<Notif> {
      return this.Notifs.Notifs.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 0)
    },
    getNotifsByName () {
      return (name: string) => {
        name = name.toLowerCase()
        return this.Notifs.Notifs.filter((el) => el.EmailAddress?.toLowerCase()?.includes(name) || el.PhoneNO?.toLowerCase()?.includes(name))
      }
    }
  },
  actions: {
    getAppNotifs (req: GetAppNotifsRequest, done: (error: boolean, rows: Array<Notif>) => void) {
      doActionWithError<GetAppNotifsRequest, GetAppNotifsResponse>(
        API.GET_APP_NOTIFS,
        req,
        req.Message,
        (resp: GetAppNotifsResponse): void => {
          this.Notifs.Notifs.push(...resp.Infos)
          this.Notifs.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        })
    }
  }
})
