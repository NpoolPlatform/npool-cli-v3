import { doActionWithError } from '../../../action'
import { defineStore } from 'pinia'
import { API } from './const'
import { Detail } from '../../../base'
import { 
  GetAppDetailsRequest,
  GetAppDetailsResponse
} from './types'

export const useChurchDetailStore = defineStore('church-detail-v4', {
  state: () => ({
    Details: {
      Details: new Map<string, Array<Detail>>(),
      Total: 0
    }
  }),
  getters: {
    targetAppDetails() : (appID: string) => Array<Detail> {
      return (appID: string) => {
        const data = this.Details.Details.get(appID)
        return !data ? [] as Array<Detail> : data
      }
    },
    getUserDetails() : (appID: string, userID: string) => Array<Detail> {
      return (appID: string, userID: string) => {
        const data = this.Details.Details.get(appID)
        return !data ? [] : data.filter((el) => el.UserID === userID)
      }
    }
  },
  actions: {
    getAppDetails(req: GetAppDetailsRequest, done: (detail: Array<Detail>, error: boolean) => void) {
      doActionWithError<GetAppDetailsRequest, GetAppDetailsResponse>(
        API.GET_APP_DETAILS,
        req,
        req.Message,
        (resp: GetAppDetailsResponse): void => {
          const details = this.targetAppDetails(req.TargetAppID)
          details.push(...resp.Infos)
          this.Details.Details.set(req.TargetAppID, details)
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    }
  }
})
