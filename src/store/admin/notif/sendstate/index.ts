import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetAppSendStatesRequest,
  GetAppSendStatesResponse,
} from './types'
import { doActionWithError } from '../../../action'
import { SendState } from '../../../base'

export const useAdminSendStateStore = defineStore('admin-sendstate-v4', {
  state: () => ({
    SendStates: {
      SendStates: [] as Array<SendState>,
      Total: 0
    }
  }),
  getters: {
    getStatesByID () {
      return (id: string) => {
        return this.SendStates.SendStates.filter((el) =>
          el.AnnouncementID?.toLowerCase().includes(id) ||
          el.EmailAddress?.toLowerCase().includes(id) ||
          el.PhoneNO?.toLowerCase().includes(id)
        )
      }
    }
  },
  actions: {
    getAppSendStates (req: GetAppSendStatesRequest, done: (error: boolean, rows: Array<SendState>) => void) {
      doActionWithError<GetAppSendStatesRequest, GetAppSendStatesResponse>(
        API.GET_APP_SENDSTATES,
        req,
        req.Message,
        (resp: GetAppSendStatesResponse): void => {
          this.SendStates.SendStates.push(...resp.Infos)
          this.SendStates.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<SendState>)
        }
      )
    }
  }
})
