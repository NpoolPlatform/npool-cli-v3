import { defineStore } from 'pinia'
import { Order, OrderState, OrderTimeoutSeconds} from '../../../base'
import { remain } from '../../../../utils'
import { InvalidID } from '../../../../const'
import { doActionWithError } from '../../../action'
import {
  GetOrderRequest,
  GetOrderResponse,
  GetOrdersRequest,
  GetOrdersResponse,
  CreateOrderRequest,
  CreateOrderResponse,
  UpdateOrderRequest,
  UpdateOrderResponse
} from './types'
import { API } from './const'

export const useFrontendOrderStore = defineStore('frontend-order-v4', {
  state: () => ({
    Orders: {
      Orders: [] as Array<Order>,
      Total: 0
    } 
  }),
  getters: {
    orders (): Array<Order> {
      return this.Orders.Orders.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
    },
    getOrderByID () {
      return (id:string) => {
        return this.Orders.Orders.find((order) => order.ID === id)
      }
    },
    getOrderState () {
      return (order: Order) => {
        if (!order) {
          return 'MSG_ERROR'
        }

        if (order.PaymentID === OrderState.DEFAULT_STATE) {
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
    getOrders (req: GetOrdersRequest, done: (orders: Array<Order>, error: boolean) => void) {
      doActionWithError<GetOrdersRequest, GetOrdersResponse>(
        API.GET_ORDERS,
        req,
        req.Message,
        (resp: GetOrdersResponse): void => {
          this.Orders.Orders.push(...resp.Infos)
          this.Orders.Total = resp.Total
          done(resp.Infos, false)
        },
        () => {
          done([], true)
        }
      )
    },
    createOrder (req: CreateOrderRequest, done: (order: Order, error: boolean) => void) {
      doActionWithError<CreateOrderRequest, CreateOrderResponse>(
        API.CREATE_ORDER,
        req,
        req.Message,
        (resp: CreateOrderResponse): void => {
          this.Orders.Orders.push(resp.Info)
          this.Orders.Total += 1
          done(resp.Info, false)
        },
        () => {
          done({} as Order,  true)
        }
      )
    },
    updateOrder (req: UpdateOrderRequest, done: (order: Order, error: boolean) => void) {
      doActionWithError<UpdateOrderRequest, UpdateOrderResponse>(
        API.UPDATE_ORDER,
        req,
        req.Message,
        (resp: UpdateOrderResponse): void => {
          const index = this.Orders.Orders.findIndex((el) => el.ID === resp.Info.ID)
          this.Orders.Orders.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(resp.Info, false)
        },
        () => {
          done({} as Order, true)
        }
      )
    },
    getOrder (req: GetOrderRequest, done: (order: Order, error: boolean) => void) {
      doActionWithError<GetOrderRequest, GetOrderResponse>(
        API.GET_ORDER,
        req,
        req.Message,
        (resp: GetOrderResponse): void => {
          const index = this.Orders.Orders.findIndex((el) => el.ID === resp.Info.ID)
          this.Orders.Orders.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(resp.Info, false)
        },
        () => {
          done({} as Order, true)
        }
      )
    }
  }
})
