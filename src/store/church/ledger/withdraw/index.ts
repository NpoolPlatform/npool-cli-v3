import { doActionWithError } from '../../../action'
import { defineStore } from 'pinia'
import { API } from './const'
import { Withdraw} from '../../../base'
import { 
  GetAppWithdrawsRequest,
  GetAppWithdrawsResponse
} from './types'

export const useChurchLedgerWithdrawStore = defineStore('church-ledgerwithdraw-v4', {
  state: () => ({
    Withdraws: {
      Withdraws: new Map<string, Array<Withdraw>>(),
      Total: 0
    }
  }),
  getters: {
    getWithdrawsByAppID() : (appID: string) => Array<Withdraw> {
      return (appID: string) => {
        const data = this.Withdraws.Withdraws.get(appID)
        return !data ? [] as Array<Withdraw> : data
      }
    },
  },
  actions: {
    getAppWithdraws (req: GetAppWithdrawsRequest, done: (withdraw: Array<Withdraw>, error: boolean) => void) {
      doActionWithError<GetAppWithdrawsRequest, GetAppWithdrawsResponse>(
        API.GET_APP_WITHDRAWS,
        req,
        req.Message,
        (resp: GetAppWithdrawsResponse): void => {
          const data = this.getWithdrawsByAppID(req.TargetAppID)
          data.push(...resp.Infos)
          this.Withdraws.Withdraws.set(req.TargetAppID, data)
          done(resp.Infos, false)
        }, () => {
          done([] as Array<Withdraw>, true)
        })
    }
  }
})
