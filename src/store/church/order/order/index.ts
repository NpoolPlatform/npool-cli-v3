import { defineStore } from 'pinia'

import {
  GetNAppOrdersRequest,
  GetNAppOrdersResponse,
  CreateAppUserOrderResponse,
  CreateAppUserOrderRequest,
  UpdateAppUserOrderRequest,
  UpdateAppUserOrderResponse
} from './types'
import { API } from './const'
import { Order, OrderState, OrderTimeoutSeconds} from '../../../base'
import { remain } from '../../../../utils'
import { InvalidID } from '../../../../const'
import { doActionWithError } from '../../../action'

export const useChurchOrderStore = defineStore('church-order-v4', {
  state: () => ({
    Orders: {
      Orders: new Map<string, Array<Order>>(),
      Total: 0
    }
    
  }),
  getters: {
    getOrdersByAppID () {
      return  (appID: string) => {
        const data = this.Orders.Orders.get(appID)
        return !data? [] : this.sort(data)
      }
    },
    sort () {
      return (orders: Array<Order>) => {
        return orders.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
      } 
    },
    getOrderState () {
      return (order: Order) => {
        if (!order) {
          return 'MSG_ERROR'
        }

        if (order.PaymentID === InvalidID) {
          return 'MSG_INVALID_PAYMENT'
        }
        if (order.State === OrderState.PAYMENT_TIMEOUT) {
          return 'MSG_CANCELED_BY_TIMEOUT'
        }
        if (order.State === OrderState.WAIT_PAYMENT) {
          return remain(order.CreatedAt + OrderTimeoutSeconds)
        }
        if (order.State === OrderState.EXPIRED) {
          return 'MSG_DONE'
        }
        if (order.State === OrderState.CANCELED || order.State === OrderState.USER_CANCELED) {
          return 'MSG_PAYMENT_CANCELED'
        }
        if (order.State === OrderState.PAID) {
          return 'MSG_WAIT_FOR_START'
        }
        return 'MSG_IN_SERVICE'
      }
    },
    orderPaid (): (order: Order) => boolean {
      return (order: Order) => {
        return order.State === OrderState.PAID || order.State === OrderState.IN_SERVICE || order.State === OrderState.EXPIRED
      }
    },
    validateOrder () {
      return (order: Order) => {
        if (!order) {
          return false
        }
        if (order.PaymentID === InvalidID) {
          return false
        }
        if (order.State === OrderState.PAYMENT_TIMEOUT) {
          return false
        }
        if (order.State === OrderState.EXPIRED) {
          return false
        }
        if (order.State === OrderState.CANCELED) {
          return false
        }
        if (order.State === OrderState.USER_CANCELED) {
          return false
        }
        return true
      }
    }
  },
  actions: {
    getNAppOrders (req: GetNAppOrdersRequest, done: (orders: Array<Order>,error: boolean) => void) {
      doActionWithError<GetNAppOrdersRequest, GetNAppOrdersResponse>(
        API.GET_N_APP_ORDERS,
        req,
        req.Message,
        (resp: GetNAppOrdersResponse): void => {
          const data = this.getOrdersByAppID(req.TargetAppID)
          data.push(...resp.Infos)
          this.Orders.Total = resp.Total
          done(resp.Infos, false)
        },
        () => {
          done([], true)
        }
      )
    },
    createAppUserOrder (req: CreateAppUserOrderRequest, done: (order: Order, error: boolean) => void) {
      doActionWithError<CreateAppUserOrderRequest, CreateAppUserOrderResponse>(
        API.CREATE_APP_USER_ORDER,
        req,
        req.Message,
        (resp: CreateAppUserOrderResponse): void => {
          const data = this.getOrdersByAppID(req.TargetAppID)
          data.splice(0, 0, resp.Info)
          // this.Orders.Orders.set(req.TargetAppID, data)
          this.Orders.Total += 1
          done(resp.Info, false)
        },
        () => {
          done({} as Order, true)
        }
      )
    },
    updateAppUserOrder (req: UpdateAppUserOrderRequest, done: (order: Order, error: boolean) => void) {
      doActionWithError<UpdateAppUserOrderRequest, UpdateAppUserOrderResponse>(
        API.UPDATE_APP_USER_ORDER,
        req,
        req.Message,
        (resp: UpdateAppUserOrderResponse): void => {
          const data = this.getOrdersByAppID(req.TargetAppID)
          const index = data.findIndex((el) => el.ID === resp.Info.ID)
          data.splice(index, 1, resp.Info)
          // this.Orders.Orders.set(req.TargetAppID, data)
          done(resp.Info, false)
        },
        () => {
          done({} as Order, true)
        }
      )
    }
  }
})
