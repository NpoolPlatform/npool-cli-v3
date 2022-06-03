import { defineStore } from 'pinia'
import { OrderState } from './state'
import { doActionWithError } from '../../action'
import { API } from './const'
import {
  GetTargetAppOrdersRequest,
  GetTargetAppOrdersResponse
} from './types'
import { Order } from '../../frontend'

export const useChurchOrderStore = defineStore('churchorder', {
  state: (): OrderState => ({
    Orders: new Map<string, Array<Order>>()
  }),
  getters: {},
  actions: {
    getOrders (req: GetTargetAppOrdersRequest, done?: (error: boolean) => void) {
      doActionWithError<GetTargetAppOrdersRequest, GetTargetAppOrdersResponse>(
        API.GET_ORDERS,
        req,
        req.Message,
        (resp: GetTargetAppOrdersResponse): void => {
          this.Orders.set(req.TargetAppID, resp.Infos)
          done?.(false)
        }, () => {
          done?.(true)
        })
    }
  }
})

export * from './types'
