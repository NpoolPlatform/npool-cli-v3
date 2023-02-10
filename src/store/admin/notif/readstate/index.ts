import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetAppReadStatesRequest,
  GetAppReadStatesResponse,
  CreateReadStateRequest,
  CreateReadStateResponse,
} from './types'
import { ReadState } from '../../../base'
import { doActionWithError } from '../../../action'

export const useAdminReadStateStore = defineStore('admin-readstate-v4', {
  state: () => ({
    ReadStates: {
      ReadStates: [] as Array<ReadState>,
      Total: 0
    }
  }),
  getters: {
    getStatesByID () {
      return (id: string) => {
        return this.ReadStates.ReadStates.filter((el) =>
          el.AnnouncementID?.toLowerCase().includes(id) ||
          el.EmailAddress?.toLowerCase().includes(id) ||
          el.PhoneNO?.toLowerCase().includes(id)
        )
      }
    }
  },
  actions: {
    getAppReadStates (req: GetAppReadStatesRequest, done: (error: boolean, rows: Array<ReadState>) => void) {
      doActionWithError<GetAppReadStatesRequest, GetAppReadStatesResponse>(
        API.GET_APP_READSTATES,
        req,
        req.Message,
        (resp: GetAppReadStatesResponse): void => {
          this.ReadStates.ReadStates.push(...resp.Infos)
          this.ReadStates.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<ReadState>)
        }
      )
    },
    createReadState (req: CreateReadStateRequest, done: (error: boolean, row: ReadState) => void) {
      doActionWithError<CreateReadStateRequest, CreateReadStateResponse>(
        API.CREATE_READSTATE,
        req,
        req.Message,
        (resp: CreateReadStateResponse): void => {
          this.ReadStates.ReadStates.push(resp.Info)
          this.ReadStates.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as ReadState)
        }
      )
    }
  }
})
