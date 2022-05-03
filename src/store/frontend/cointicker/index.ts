import { defineStore } from 'pinia'
import { doGet } from '../../action'
import { API } from './const'
import {
  CoinTickerState,
  GetTickersRequest,
  Ticker
} from './types'

export const useCoinTickerStore = defineStore('cointicker', {
  state: (): CoinTickerState => ({
    Tickers: new Map<string, Ticker>()
  }),
  getters: {
    getTickerByCoinName (): (coinName: string) => Ticker {
      return (coinName: string) => {
        return this.Tickers.get(coinName) as Ticker
      }
    }
  },
  actions: {
    getCoinTickers (req: GetTickersRequest, done: () => void) {
      const url = API.GET_TICKER + '?assets=' + req.CoinNames.join(',')
      doGet<GetTickersRequest, Map<string, Ticker>>(
        url,
        req,
        req.Message,
        (resp: Map<string, Ticker>): void => {
          for (const [k, v] of resp) {
            this.Tickers.set(k, v)
          }
          done()
        })
    } 
  }
})

export * from './types'
