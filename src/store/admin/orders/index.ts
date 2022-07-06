import { defineStore } from 'pinia'
import { OrderState } from './state'
import { doActionWithError } from '../../action'
import { API } from './const'
import {
  GetAppBaseOrdersRequest,
  GetAppBaseOrdersResponse,
  GetAppOrdersRequest,
  GetAppOrdersResponse,
  SubmitUserOrderRequest,
  SubmitUserOrderResponse
} from './types'
import { InvalidID } from '../../../const'

export const useAdminOrderStore = defineStore('adminorder', {
  state: (): OrderState => ({
    Orders: [],
    BaseOrders: []
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
    },

    getBaseOrders (req: GetAppBaseOrdersRequest, done?: (error: boolean) => void) {
      doActionWithError<GetAppBaseOrdersRequest, GetAppBaseOrdersResponse>(
        API.GET_BASE_ORDERS,
        req,
        req.Message,
        (resp: GetAppBaseOrdersResponse): void => {
          this.BaseOrders = resp.Infos
          done?.(false)
        }, () => {
          done?.(true)
        })
    },

    submitOrder (req: SubmitUserOrderRequest, handler: (orderID: string, error: boolean) => void) {
      doActionWithError<SubmitUserOrderRequest, SubmitUserOrderResponse>(
        API.SUBMIT_ORDER,
        req,
        req.Message,
        (resp: SubmitUserOrderResponse): void => {
          this.Orders.splice(0, 0, resp.Info)
          handler(resp.Info.Order.Order.ID, false)
        }, () => {
          handler(InvalidID, true)
        })
    }
  }
})

export * from './types'
