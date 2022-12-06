import { defineStore } from 'pinia'
import { API } from './const'
import { 
  GetCurrenciesRequest, 
  GetCurrenciesResponse, 
  GetHistoriesRequest, 
  GetHistoriesResponse, 
  GetLegalCurrenciesRequest,
} from './types'
import { doActionWithError, doGetWithError } from '../../../action'
import { CoinType, Currency, CurrencyType } from '../../../base'

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
    LegalCurrencies: new Map<string, number>()
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
      return () => {
        const data = this.LegalCurrencies.get(CurrencyType.JPY)
        return !data ? 1 : data
      }
    },
    getUSDCurrency () {
      return (coinTypeID: string) => {
        const cur = this.getCurrency(coinTypeID)
        if (!cur) return 1
        return Number(cur.MarketValueLow)
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
    },
    getLegalCurrencies (req: GetLegalCurrenciesRequest, done: (error: boolean) => void) {
      const url = API.GET_COIN_CURRENCIES + '?ids=' + CoinType.USDTERC20 + '&vs_currencies=' + req.CurrencyType
      doGetWithError<GetLegalCurrenciesRequest, Map<string, Map<CurrencyType, number>>>(
        url,
        {} as GetLegalCurrenciesRequest,
        req.Message,
        (resp: Map<string, Map<CurrencyType, number>>): void => {
          Object.entries(resp).forEach(([name, value]) => {
            console.log(name)
            Object.entries(value as Map<string, number>).forEach(([currency, amount]) => {
              this.LegalCurrencies.set(currency, amount as number)
            })
          })
          done(false)
        }, () => {
          done(true)
        })
    }
})
