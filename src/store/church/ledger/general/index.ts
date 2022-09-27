import { doActionWithError } from '../../../action'
import { defineStore } from 'pinia'
import { API } from './const'
import { General} from '../../../base'
import { 
  GetAppGeneralsRequest,
  GetAppGeneralsResponse
} from './types'

export const useChurchGeneralStore = defineStore('church-general-v4', {
  state: () => ({
    Generals: {
      Generals: new Map<string, Array<General>>(),
      Total: 0
    }
  }),
  getters: {
    targetAppGenerals() : (appID: string) => Array<General> {
      return (appID: string) => {
        const data = this.Generals.Generals.get(appID)
        return !data ? [] as Array<General> : data
      }
    },
    getUserGenerals() : (appID: string, userID: string) => Array<General> {
      return (appID: string, userID: string) => {
        const data = this.Generals.Generals.get(appID)
        return !data ? [] : data.filter((el) => el.UserID === userID)
      }
    }
  },
  actions: {
    getAppGenerals(req: GetAppGeneralsRequest, done: (generals: Array<General>, error: boolean) => void) {
      doActionWithError<GetAppGeneralsRequest, GetAppGeneralsResponse>(
        API.GET_APP_GENERALS,
        req,
        req.Message,
        (resp: GetAppGeneralsResponse): void => {
          const generals = this.targetAppGenerals(req.TargetAppID)
          generals.push(...resp.Infos)
          this.Generals.Generals.set(req.TargetAppID, generals)
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    }
  }
})
