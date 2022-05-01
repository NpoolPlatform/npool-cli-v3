import { defineStore } from 'pinia'
import { doActionWithError } from '../../action'
import { API } from './const'
import { StockState } from './state'
import {
  GetStocksRequest,
  GetStocksResponse,
} from './types'

export const useStockStore = defineStore('stock', {
  state: (): StockState => ({
    Stocks: []
  }),
  getters: {},
  actions: {
    getStocks (req: GetStocksRequest, done: (error: boolean) => void) {
      doActionWithError<GetStocksRequest, GetStocksResponse>(
        API.GET_STOCKS,
        req,
        req.Message,
        (resp: GetStocksResponse): void => {
          this.Stocks = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
