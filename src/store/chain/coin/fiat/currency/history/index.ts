import { defineStore } from 'pinia'
import { API } from './const'
import {
  Currency,
  GetCoinFiatCurrenciesRequest,
  GetCoinFiatCurrenciesResponse
} from './types'
import { doActionWithError } from '../../../../../action'

export const useCoinFiatCurrencyHistoryStore = defineStore('coinfiatcurrencyhistory-v4', {
  state: () => ({
    Histories: {
      Histories: [] as Array<Currency>,
      Total: 0
    }
  }),
  getters: {
  },
  actions: {
    getCoinFiatCurrencyHistories (req: GetCoinFiatCurrenciesRequest, done: (error: boolean, rows: Array<Currency>) => void) {
      doActionWithError<GetCoinFiatCurrenciesRequest, GetCoinFiatCurrenciesResponse>(
        API.GET_COIN_FIAT_CURRENCY_HISTORIES,
        req,
        req.Message,
        (resp: GetCoinFiatCurrenciesResponse): void => {
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
