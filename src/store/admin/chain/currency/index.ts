import { defineStore } from 'pinia'
import { API, CoinType, CurrencyType } from './const'
import { 
  GetCurrenciesRequest, 
  GetCurrenciesResponse, 
  GetHistoriesRequest, 
  GetHistoriesResponse, 
  GetLegalCurrenciesRequest
} from './types'
import { doActionWithError } from '../../../action'
import { Currency } from '../../../base'

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
    LegalCurrencies: new Map<string, Map<string, number>>(),
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
    },
    getJPYCurrency() {
      const data = this.LegalCurrencies.get(CoinType.USDTERC20) as Map<string, number>
      if (!data) return 1
      return data.get(CurrencyType.JPY)
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
    },
    getLegalCurrencies(req: GetLegalCurrenciesRequest, done: (error: boolean) => void) {
      const url = API.GET_COIN_CURRENCIES + '?ids=' + CoinType.USDTERC20 + '&vs_currencies=' + req.CurrencyType
      doActionWithError<GetLegalCurrenciesRequest, Map<string, Map<string, number>>>(
        url,
        req,
        req.Message,
        (resp: Map<string, Map<string, number>>): void => {
          for (const [name, currencyMap] of Object.entries(resp)) {
            this.LegalCurrencies.set(name, currencyMap)
          }
          done(false)
        }, () => {
          done(true)
        })
      },
    }
})
