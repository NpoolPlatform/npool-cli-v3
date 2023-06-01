import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetCurrencyHistoriesRequest,
  GetCurrencyHistoriesResponse
} from './types'
import { doActionWithError } from '../../../../../action'
import { CoinCurrency } from '../types'

export const useCoinCurrencyHistoryStore = defineStore('coincurrencyhistory-v4', {
  state: () => ({
    Histories: {
      Histories: [] as Array<CoinCurrency>,
      Total: 0
    }
  }),
  getters: {
  },
  actions: {
    getCurrencyHistories (req: GetCurrencyHistoriesRequest, done: (error: boolean, rows: Array<CoinCurrency>) => void) {
      doActionWithError<GetCurrencyHistoriesRequest, GetCurrencyHistoriesResponse>(
        API.GET_HISTORIES,
        req,
        req.Message,
        (resp: GetCurrencyHistoriesResponse): void => {
          this.Histories.Histories.push(...resp.Infos)
          this.Histories.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<CoinCurrency>)
        }
      )
    }
  }
})

export * from './types'