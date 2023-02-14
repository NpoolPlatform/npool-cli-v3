import { defineStore } from 'pinia'
import { Notif } from '../../../base'
import { doActionWithError } from '../../../action'
import { API } from './const'

import {
  GetNotifRequest,
  GetNotifResponse,
  GetNotifsRequest,
  GetNotifsResponse,
  UpdateNotifsRequest,
  UpdateNotifsResponse
} from './types'

export const useFrontendNotifStore = defineStore('frontend-notif-v4', {
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
    }
  },
  actions: {
    getNotifs (req: GetNotifsRequest, done: (error: boolean, rows: Array<Notif>) => void) {
      doActionWithError<GetNotifsRequest, GetNotifsResponse>(
        API.GET_NOTIFS,
        req,
        req.Message,
        (resp: GetNotifsResponse): void => {
          resp.Infos.forEach((el) => {
            const index = this.Notifs.Notifs.findIndex((al) => al.ID === el.ID)
            if (index === -1) this.Notifs.Notifs.push(el)
          })
          this.Notifs.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [])
        })
    },
    getNotif (req: GetNotifRequest, done: (error: boolean, row: Notif) => void) {
      doActionWithError<GetNotifRequest, GetNotifResponse>(
        API.GET_NOTIF,
        req,
        req.Message,
        (resp: GetNotifResponse): void => {
          done(false, resp.Info)
        }, () => {
          done(true, {} as Notif)
        })
    },
    updateNotifs (req: UpdateNotifsRequest, done: (error: boolean, rows: Notif[]) => void) {
      doActionWithError<UpdateNotifsRequest, UpdateNotifsResponse>(
        API.UPDATE_NOTIFS,
        req,
        req.Message,
        (resp: UpdateNotifsResponse): void => {
          resp.Infos.forEach((rl) => {
            const index = this.Notifs.Notifs.findIndex((el) => el.ID === rl.ID)
            this.Notifs.Notifs.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, rl)
          })
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Notif[])
        })
    }
  }
})
