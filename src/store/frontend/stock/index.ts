import { defineStore } from 'pinia'
import { doActionWithError } from '../../action'
import { API } from './const'
import { StockState } from './state'
import {
  GetStocksRequest,
  GetStocksResponse,
  Stock,
} from './types'

export const useStockStore = defineStore('stock', {
  state: (): StockState => ({
    Stocks: []
  }),
  getters: {
    getStockByGoodID (): (goodID: string) => Stock {
      return (goodID: string) => {
        const index = this.Stocks.findIndex((el) => el.GoodID === goodID)
        return index < 0 ? undefined as unknown as Stock : this.Stocks[index]
      }
    }
  },
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
