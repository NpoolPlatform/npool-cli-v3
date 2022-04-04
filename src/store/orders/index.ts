import { defineStore } from 'pinia'
import { InvalidID } from '../../const'
import { remain } from '../../utils/timer'
import { doAction, doActionWithError } from '../action'
import { API, OrderTimeoutSeconds, PaymentState } from './const'
import {
  CreatePaymentRequest,
  CreatePaymentResponse,
  GetOrderRequest,
  GetOrderResponse,
  GetOrdersRequest,
  GetOrdersResponse,
  Order,
  OrderState,
  SubmitOrderRequest,
  SubmitOrderResponse
} from './types'

export const useOrderStore = defineStore('order', {
  state: (): OrderState => ({
    Orders: []
  }),
  getters: {
    getOrderByID (): (id: string) => Order {
      return (id: string): Order => {
        for (const order of this.Orders) {
          if (order.Order.Order.ID === id) {
            return order
          }
        }
        return undefined as unknown as Order
      }
    },

    getOrdersByCoin (): (coinTypeID: string) => Array<Order> {
      return (coinTypeID: string): Array<Order> => {
        return this.Orders.filter((order: Order) => coinTypeID === order.Good.Main?.ID)
      }
    },

    getOrderState (): (order: Order) => string {
      return (order: Order): string => {
        if (!order) {
          return 'MSG_ERROR'
        }

        const now = new Date().getTime() / 1000
        if (!order.Order.Payment) {
          return 'MSG_INVALID_PAYMENT'
        }
        if (order.Order.Payment && order.Order.Payment.State === PaymentState.TIMEOUT) {
          return 'MSG_CANCELED_BY_TIMEOUT'
        }
        if (order.Order.Payment && order.Order.Payment.State === PaymentState.WAIT && now < order.Order.Order.CreateAt + OrderTimeoutSeconds) {
          return remain(order.Order.Order.CreateAt + OrderTimeoutSeconds)
        }
        if (order.Order.Payment && order.Order.Payment.State === PaymentState.FAIL) {
          return 'MSG_PAYMENT_FAIL'
        }
        if (now < order.Order.Order.Start) {
          return 'MSG_WAIT_FOR_START'
        }
        if (order.Order.Order.End < now) {
          return 'MSG_DONE'
        }
        return 'MSG_IN_SERVICE'
      }
    },

    validateOrder (): (order: Order) => boolean {
      return (order: Order): boolean => {
        if (!order) {
          return false
        }

        const now = new Date().getTime() / 1000
        if (!order.Order.Payment) {
          return false
        }
        if (order.Order.Payment && order.Order.Payment.State === PaymentState.TIMEOUT) {
          return false
        }
        if (order.Order.Payment && order.Order.Payment.State === PaymentState.WAIT && now < order.Order.Order.CreateAt + OrderTimeoutSeconds) {
          return true
        }
        if (order.Order.Payment && order.Order.Payment.State === PaymentState.FAIL) {
          return false
        }
        return true
      }
    }
  },
  actions: {
    insertOrder (order: Order) {
      for (let i = 0; i < this.Orders.length; i++) {
        if (order.Order.Order.ID === this.Orders[i].Order.Order.ID) {
          this.Orders.splice(i, 1, order)
          return
        }
      }
      this.Orders.splice(0, 0, order)
    },

    submitOrder (req: SubmitOrderRequest, handler: (orderID: string, error: boolean) => void) {
      doActionWithError<SubmitOrderRequest, SubmitOrderResponse>(
        API.SUBMIT_ORDER,
        req,
        req.Message,
        (resp: SubmitOrderResponse): void => {
          this.insertOrder(resp.Info)
          handler(resp.Info.Order.Order.ID, false)
        }, () => {
          handler(InvalidID, true)
        })
    },

    getOrder (req: GetOrderRequest) {
      doAction<GetOrderRequest, GetOrderResponse>(
        API.GET_ORDER,
        req,
        req.Message,
        (resp: GetOrderResponse): void => {
          this.insertOrder(resp.Info)
        })
    },

    createPayment (req: CreatePaymentRequest, handler: (paymentID: string, error: boolean) => void) {
      doActionWithError<CreatePaymentRequest, CreatePaymentResponse>(
        API.CREATE_PAYMENT,
        req,
        req.Message,
        (resp: CreatePaymentResponse): void => {
          this.insertOrder(resp.Info)
          handler(resp.Info.Order.Payment.ID, false)
        }, () => {
          handler(InvalidID, true)
        })
    },

    getOrders (req: GetOrdersRequest) {
      doAction<GetOrdersRequest, GetOrdersResponse>(
        API.GET_ORDERS,
        req,
        req.Message,
        (resp: GetOrdersResponse): void => {
          this.Orders = resp.Infos
        })
    }
  }
})

export { PaymentState, OrderTimeoutSeconds } from './const'
export * from './types'
