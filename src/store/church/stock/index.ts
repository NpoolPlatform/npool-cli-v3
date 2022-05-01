import { defineStore } from 'pinia'
import { useStockStore } from '../../frontend'
import { doAction } from '../../action'
import { API } from './const'
import { StockState } from './state'
import {
  CreateStockRequest,
  CreateStockResponse,
  UpdateStockRequest,
  UpdateStockResponse
} from './types'

export const useChurchStockStore = defineStore('churchstock', {
  state: (): StockState => ({
    Stocks: []
  }),
  getters: {},
  actions: {
    createStock (req: CreateStockRequest, done: () => void) {
      doAction<CreateStockRequest, CreateStockResponse>(
        API.CREATE_STOCK,
        req,
        req.Message,
        (resp: CreateStockResponse): void => {
          const s = useStockStore()
          s.Stocks.splice(0, 0, resp.Info)
          done()
        })
    },
    updateStock (req: UpdateStockRequest, done: () => void) {
      doAction<UpdateStockRequest, UpdateStockResponse>(
        API.UPDATE_STOCK,
        req,
        req.Message,
        (resp: UpdateStockResponse): void => {
          const s = useStockStore()
          const index = s.Stocks.findIndex((el) => el.ID === resp.Info.ID)
          s.Stocks.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    }
  }
})

export * from './types'
