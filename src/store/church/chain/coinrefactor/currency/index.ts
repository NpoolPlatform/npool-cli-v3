import { defineStore } from 'pinia'
import { API } from './const'
import {
  GetCoinCurrenciesRequest,
  GetCoinCurrenciesResponse,
  GetCurrencyRequest,
  GetCurrencyResponse
} from './types'
import { doActionWithError } from '../../../../action'
import { CoinCurrency } from '../../../../base'

export const useCurrenciesStore = defineStore('currency-v4', {
  state: () => ({
    CoinCurrencies: {
      CoinCurrencies: [] as Array<CoinCurrency>,
      Total: 0
    }
  }),
  getters: {
  },
  actions: {
    getCurrencies (req: GetCoinCurrenciesRequest, done: (error: boolean, rows: Array<CoinCurrency>) => void) {
      doActionWithError<GetCoinCurrenciesRequest, GetCoinCurrenciesResponse>(
        API.GET_CURRENCIES,
        req,
        req.Message,
        (resp: GetCoinCurrenciesResponse): void => {
          resp.Infos.forEach((el) => {
            const index = this.CoinCurrencies.CoinCurrencies.findIndex((cl) => cl.ID === el.ID)
            this.CoinCurrencies.CoinCurrencies.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, el)
          })
          this.CoinCurrencies.CoinCurrencies.push(...resp.Infos)
          this.CoinCurrencies.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<CoinCurrency>)
        }
      )
    },
    getCurrency (req: GetCurrencyRequest, done: (error: boolean, row: CoinCurrency) => void) {
      doActionWithError<GetCurrencyRequest, GetCurrencyResponse>(
        API.GET_CURRENCY,
        req,
        req.Message,
        (resp: GetCurrencyResponse): void => {
          this.CoinCurrencies.CoinCurrencies.push(resp.Info)
          this.CoinCurrencies.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as CoinCurrency)
        }
      )
    }
  }
})

export * from './feed'
export * from './history'
export * from './types'