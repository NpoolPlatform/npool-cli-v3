import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetNAppReadStatesResponse,
  GetNAppReadStatesRequest
} from './types'
import { doActionWithError } from '../../../action'
import { ReadState } from '../../../base'

export const useChurchReadStateStore = defineStore('admin-readstate-v4', {
  state: () => ({
    ReadStates: {
      ReadStates: new Map<string, Array<ReadState>>(),
      Total: 0
    }
  }),
  getters: {
    getStatesByAppID () {
      return (appID: string) => {
        const rows = this.ReadStates.ReadStates.get(appID)
        return !rows ? [] as Array<ReadState> : rows
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
    getAppReadStates (req: GetNAppReadStatesRequest, done: (error: boolean, rows: Array<ReadState>) => void) {
      doActionWithError<GetNAppReadStatesRequest, GetNAppReadStatesResponse>(
        API.GET_APP_READSTATES,
        req,
        req.Message,
        (resp: GetNAppReadStatesResponse): void => {
          const rows = this.getStatesByAppID(req.TargetAppID)
          rows.push(...resp.Infos)
          this.ReadStates.ReadStates.set(req.TargetAppID, rows)
          this.ReadStates.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<ReadState>)
        }
      )
    }
  }
})
