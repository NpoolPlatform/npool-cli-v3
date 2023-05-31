import { defineStore } from 'pinia'
import { API } from './const'
import {
  Currency,
  GetCurrencyHistoriesRequest,
  GetCurrencyHistoriesResponse
} from './types'
import { doActionWithError } from '../../../../action'

export const useCoinCurrencyHistoryStore = defineStore('coincurrencyhistory-v4', {
  state: () => ({
    Histories: {
      Histories: [] as Array<Currency>,
      Total: 0
    }
  }),
  getters: {
  },
  actions: {
    getCurrencyHistories (req: GetCurrencyHistoriesRequest, done: (error: boolean, rows: Array<Currency>) => void) {
      doActionWithError<GetCurrencyHistoriesRequest, GetCurrencyHistoriesResponse>(
        API.GET_HISTORIES,
        req,
        req.Message,
        (resp: GetCurrencyHistoriesResponse): void => {
          this.Histories.Histories.push(...resp.Infos)
          this.Histories.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Currency>)
        }
      )
    }
  }
})
