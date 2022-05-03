import { defineStore } from 'pinia'
import { doGet } from '../../action'
import { API } from './const'
import {
  CoinTickerState,
  ETHGas,
  GetETHGasRequest,
  GetTickersRequest,
  GetTickersResponse,
  Ticker
} from './types'

export const useCoinTickerStore = defineStore('cointicker', {
  state: (): CoinTickerState => ({
    Tickers: new Map<string, Ticker>(),
    ETHGas: {
      fast: 0,
      fastest: 0,
      safeLow: 0,
      average: 0
    }
  }),
  getters: {
    getTickerByCoinName (): (coinName: string) => Ticker {
      return (coinName: string) => {
        return this.Tickers.get(coinName) as Ticker
      }
    }
  },
  actions: {
    getCoinTickers (req: GetTickersRequest, done: (error: boolean) => void) {
      const url = API.GET_TICKER + '?assets=' + req.CoinNames.join(',')
      doGet<GetTickersRequest, GetTickersResponse>(
        url,
        req,
        req.Message,
        (resp: GetTickersResponse): void => {
          if (resp.statusCode !== 200) {
            done(true)
            return
          }
          Object.keys(resp.data).forEach((key) => {
            this.Tickers.set(key, (resp.data as unknown as Record<string, unknown>)[key] as Ticker)
          })
          done(false)
        })
    },
    getETHGas (req: GetETHGasRequest, done: () => void) {
      doGet<GetETHGasRequest, ETHGas>(
        API.GET_ETH_GAS,
        req,
        req.Message,
        (resp: ETHGas): void => {
          this.ETHGas = resp
          done()
        })
    }
  }
})

export * from './types'
