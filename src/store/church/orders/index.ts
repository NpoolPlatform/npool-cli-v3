import { defineStore } from 'pinia'
import { OrderState } from './state'
import { doActionWithError } from '../../action'
import { API } from './const'
import {
  GetTargetAppBaseOrdersRequest,
  GetTargetAppBaseOrdersResponse,
  GetTargetAppOrdersRequest,
  GetTargetAppOrdersResponse,
  SubmitAppUserOrderRequest,
  SubmitAppUserOrderResponse
} from './types'
import { Order, OrderBase } from '../../frontend'
import { InvalidID } from '../../../const'

export const useChurchOrderStore = defineStore('churchorder', {
  state: (): OrderState => ({
    Orders: new Map<string, Array<Order>>(),
    BaseOrders: new Map<string, Array<OrderBase>>()
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
    },

    getBaseOrders (req: GetTargetAppBaseOrdersRequest, done?: (error: boolean) => void) {
      doActionWithError<GetTargetAppBaseOrdersRequest, GetTargetAppBaseOrdersResponse>(
        API.GET_BASE_ORDERS,
        req,
        req.Message,
        (resp: GetTargetAppBaseOrdersResponse): void => {
          this.BaseOrders.set(req.TargetAppID, resp.Infos)
          done?.(false)
        }, () => {
          done?.(true)
        })
    },

    submitOrder (req: SubmitAppUserOrderRequest, handler: (orderID: string, error: boolean) => void) {
      doActionWithError<SubmitAppUserOrderRequest, SubmitAppUserOrderResponse>(
        API.SUBMIT_ORDER,
        req,
        req.Message,
        (resp: SubmitAppUserOrderResponse): void => {
          let orders = this.Orders.get(req.TargetAppID)
          if (!orders) {
            orders = []
          }
          orders.splice(0, 0, resp.Info)
          this.Orders.set(req.TargetAppID, orders)
          handler(resp.Info.Order.Order.ID, false)
        }, () => {
          handler(InvalidID, true)
        })
    }
  }
})

export * from './types'
