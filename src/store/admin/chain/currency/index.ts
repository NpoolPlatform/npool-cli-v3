import { defineStore } from 'pinia'
import { API } from './const'
import { 
  GetCurrenciesRequest, 
  GetCurrenciesResponse, 
  GetHistoriesRequest, 
  GetHistoriesResponse 
} from './types'
import { Currency } from '../../../base'
import { doActionWithError } from '../../../action'

export const useAdminCurrencyStore = defineStore('admin-currency-v4', {
  state: () => ({
    Currencies: {
      Currencies: [] as Array<Currency>,
      Total: 0
    },
    Histories: {
      Histories: new Map<string, Array<Currency>>(),
      Total: 0
    },
  }),
  getters: {
    getCurrency () {
      return (coinTypeID: string) => {
        return this.Currencies.Currencies.find((el) => el.CoinTypeID === coinTypeID)
      }
    },
    getHistoriesByID () {
      return (coinTypeID: string) => {
        const data = this.Histories.Histories.get(coinTypeID)
        return !data? [] as Array<Currency> : data
      }
    }
  },
  actions: {
    getCurrencies (req: GetCurrenciesRequest, done: (error: boolean, rows: Array<Currency>) => void) {
      doActionWithError<GetCurrenciesRequest, GetCurrenciesResponse>(
        API.GET_CURRENCIES,
        req,
        req.Message,
        (resp: GetCurrenciesResponse): void => {
          this.Currencies.Currencies.push(...resp.Infos)
          this.Currencies.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Currency>)
        })
    },
    getHistories (req: GetHistoriesRequest, done: (error: boolean, rows: Array<Currency>) => void) {
      doActionWithError<GetHistoriesRequest, GetHistoriesResponse>(
        API.GET_HISTORIES,
        req,
        req.Message,
        (resp: GetHistoriesResponse): void => {
          const data = this.getHistoriesByID(req.CoinTypeID)
          data.push(...resp.Infos)
          this.Histories.Histories.set(req.CoinTypeID, data)
          this.Currencies.Total = resp.Total
          done(false, resp.Infos)
        }, () => {
          done(true, [] as Array<Currency>)
        })
    }
  }
})
