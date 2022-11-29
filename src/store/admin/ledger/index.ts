import { defineStore } from 'pinia'
import { API } from './const'
import { Withdraw } from '../../base'
import { doActionWithError } from '../../action'
import {
  GetAppWithdrawsRequest,
  GetAppWithdrawsResponse,
} from './types'

export const useAdminLedgerWithdrawStore = defineStore('admin-ledgerwithdraw-v4', {
  state: () => ({
    Withdraws: {
      Withdraws: [] as Array<Withdraw>,
      Total: 0
    }
  }),
  getters: {
    withdraws (): Array<Withdraw> {
      return this.Withdraws.Withdraws.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
    }
  },
  actions: {
    getAppWithdraws (req: GetAppWithdrawsRequest, done: (error: boolean, rows: Array<Withdraw>) => void) {
      doActionWithError<GetAppWithdrawsRequest, GetAppWithdrawsResponse>(
        API.GET_APP_WITHDRAWS,
        req,
        req.Message,
        (resp: GetAppWithdrawsResponse): void => {
          this.Withdraws.Withdraws.push(...resp.Infos)
          this.Withdraws.Total = resp.Total
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<Withdraw>)
        }
      )
    }
  }
})