import { defineStore } from 'pinia'
import { API } from './const'
import { 
  GetCurrenciesRequest,
  GetCurrenciesResponse,
  GetCurrencyRequest,
  GetCurrencyResponse
} from './types'
import { doActionWithError } from '../../../action'
import { CurrencyType, CoinCurrency } from '../../../base'

export const useAdminCurrencyStore = defineStore('admin-currency-v4', {
  state: () => ({
    Currencies: {
      Currencies: [] as Array<CoinCurrency>,
      Total: 0
    },
    Histories: {
      Histories: new Map<string, Array<CoinCurrency>>(),
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
    haveCurrency () {
      return (coinTypeID: string) => {
        const currency = this.Currencies.Currencies.find((el) => el.CoinTypeID === coinTypeID)
        if(!currency) return false
        return Number(currency.MarketValueLow) === 0 ? false : true
      }
    },
    getHistoriesByID () {
      return (coinTypeID: string) => {
        const data = this.Histories.Histories.get(coinTypeID)
        return !data? [] as Array<CoinCurrency> : data
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
        if (!cur) return 0
        return Number(cur.MarketValueLow)
      }
    },
    expired () {
      return () => {
        if (this.Currencies.Currencies.length === 0) return false
        const now = Math.ceil(new Date().getTime() / 1000)
        return now - this.Currencies?.Currencies[0]?.UpdatedAt <= 10 * 60 ? false : true
      }
    }
  },
  actions: {
    getCurrencies (req: GetCurrenciesRequest, done: (error: boolean, rows: Array<CoinCurrency>) => void) {
      doActionWithError<GetCurrenciesRequest, GetCurrenciesResponse>(
        API.GET_CURRENCIES,
        req,
        req.Message,
        (resp: GetCurrenciesResponse): void => {
          resp.Infos.forEach((el) => {
            const index = this.Currencies.Currencies.findIndex((cl) => cl.ID === el.ID)
            this.Currencies.Currencies.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, el)
          })
          this.Currencies.Currencies.push(...resp.Infos)
          this.Currencies.Total = resp.Total
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
          this.Currencies.Currencies.push(resp.Info)
          this.Currencies.Total += 1
          done(false, resp.Info)
        }, () => {
          done(true, {} as CoinCurrency)
        }
      )
    }
  }
})
