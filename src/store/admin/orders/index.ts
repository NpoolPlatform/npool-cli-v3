import { defineStore } from 'pinia'
import { OrderState } from './state'
import { doActionWithError } from '../../action'
import { API } from './const'
import {
  GetAppOrdersRequest,
  GetAppOrdersResponse
} from './types'

export const useAdminOrderStore = defineStore('adminorder', {
  state: (): OrderState => ({
    Orders: []
  }),
  getters: {},
  actions: {
    getOrders (req: GetAppOrdersRequest, done?: (error: boolean) => void) {
      doActionWithError<GetAppOrdersRequest, GetAppOrdersResponse>(
        API.GET_ORDERS,
        req,
        req.Message,
        (resp: GetAppOrdersResponse): void => {
          this.Orders = resp.Infos
          done?.(false)
        }, () => {
          done?.(true)
        })
    }
  }
})

export * from './types'
