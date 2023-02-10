import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetNAppSendStatesRequest,
  GetNAppSendStatesResponse,
} from './types'
import { doActionWithError } from '../../../action'
import { SendState } from '../../../base'

export const useChurchSendStateStore = defineStore('church-sendstate-v4', {
  state: () => ({
    SendStates: {
      SendStates: new Map<string, Array<SendState>>(),
      Total: 0
    }
  }),
  getters: {
    getStatesByAppID () {
      return (appID: string) => {
        const rows = this.SendStates.SendStates.get(appID)
        return !rows ? [] as Array<SendState> : rows
      }
    },
    getStatesByID () {
      return (appID: string, id: string) => {
        const rows = this.getStatesByAppID(appID)
        return rows.filter((el) =>
          el.AnnouncementID?.toLowerCase().includes(id) ||
          el.EmailAddress?.toLowerCase().includes(id) ||
          el.PhoneNO?.toLowerCase().includes(id)
        )
      }
    }
  },
  actions: {
    getAppSendStates (req: GetNAppSendStatesRequest, done: (error: boolean, rows: Array<SendState>) => void) {
      doActionWithError<GetNAppSendStatesRequest, GetNAppSendStatesResponse>(
        API.GET_APP_SENDSTATES,
        req,
        req.Message,
        (resp: GetNAppSendStatesResponse): void => {
          const rows = this.getStatesByAppID(req.TargetAppID)
          rows.push(...resp.Infos)
          this.SendStates.SendStates.set(req.TargetAppID, rows)
          this.SendStates.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<SendState>)
        }
      )
    }
  }
})
