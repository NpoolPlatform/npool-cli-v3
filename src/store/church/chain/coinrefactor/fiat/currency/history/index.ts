import { defineStore } from 'pinia'
import { API } from './const'
import {
  CoinFiatCurrency,
  GetCoinFiatCurrenciesRequest,
  GetCoinFiatCurrenciesResponse
} from './types'
import { doActionWithError } from '../../../../../../action'

export const useCoinFiatCurrencyHistoryStore = defineStore('coinfiatcurrencyhistory-v4', {
  state: () => ({
    Histories: {
      Histories: [] as Array<CoinFiatCurrency>,
      Total: 0
    }
  }),
  getters: {},
  actions: {
    getCoinFiatCurrencyHistories (req: GetCoinFiatCurrenciesRequest, done: (error: boolean, rows: Array<CoinFiatCurrency>) => void) {
      doActionWithError<GetCoinFiatCurrenciesRequest, GetCoinFiatCurrenciesResponse>(
        API.GET_COIN_FIAT_CURRENCY_HISTORIES,
        req,
        req.Message,
        (resp: GetCoinFiatCurrenciesResponse): void => {
          this.Histories.Histories.push(...resp.Infos)
          this.Histories.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<CoinFiatCurrency>)
        }
      )
    }
  }
})
export * from './types'
