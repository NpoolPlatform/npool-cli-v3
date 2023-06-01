import { defineStore } from 'pinia'
import { API } from './const'
import {
  Currency,
  GetCoinCurrenciesRequest,
  GetCoinCurrenciesResponse,
  GetCurrencyRequest,
  GetCurrencyResponse
} from './types'
import { doActionWithError } from '../../../action'

export const useCurrenciesStore = defineStore('currency-v4', {
  state: () => ({
    CoinCurrencies: {
      CoinCurrencies: [] as Array<Currency>,
      Total: 0
    }
  }),
  getters: {
  },
  actions: {
    getCurrencies (req: GetCoinCurrenciesRequest, done: (error: boolean, rows: Array<Currency>) => void) {
      doActionWithError<GetCoinCurrenciesRequest, GetCoinCurrenciesResponse>(
        API.GET_CURRENCIES,
        req,
        req.Message,
        (resp: GetCoinCurrenciesResponse): void => {
          this.CoinCurrencies.CoinCurrencies.push(...resp.Infos)
          this.CoinCurrencies.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Currency>)
        }
      )
    },
    getCurrency (req: GetCurrencyRequest, done: (error: boolean, row: Currency) => void) {
      doActionWithError<GetCurrencyRequest, GetCurrencyResponse>(
        API.GET_CURRENCY,
        req,
        req.Message,
        (resp: GetCurrencyResponse): void => {
          this.CoinCurrencies.CoinCurrencies.push(resp.Info)
          this.CoinCurrencies.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as Currency)
        }
      )
    }
  }
})

export * from './feed'
export * from './history'