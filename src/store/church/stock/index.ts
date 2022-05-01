import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { StockState } from './state'
import {
  CreateStockRequest,
  CreateStockResponse,
  GetStocksRequest,
  GetStocksResponse,
  UpdateStockRequest,
  UpdateStockResponse
} from './types'

export const useStockState = defineStore('stock', {
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
    },
    createStock (req: CreateStockRequest, done: () => void) {
      doAction<CreateStockRequest, CreateStockResponse>(
        API.CREATE_STOCK,
        req,
        req.Message,
        (resp: CreateStockResponse): void => {
          this.Stocks.splice(0, 0, resp.Info)
          done()
        })
    },
    updateStock (req: UpdateStockRequest, done: () => void) {
      doAction<UpdateStockRequest, UpdateStockResponse>(
        API.UPDATE_STOCK,
        req,
        req.Message,
        (resp: UpdateStockResponse): void => {
          const index = this.Stocks.findIndex((el) => el.ID === resp.Info.ID)
          this.Stocks.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    }
  }
})

export * from './types'
