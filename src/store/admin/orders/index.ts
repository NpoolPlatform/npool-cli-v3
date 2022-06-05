import { defineStore } from 'pinia'
import { OrderState } from './state'
import { doActionWithError } from '../../action'
import { API } from './const'
import {
  GetAppBaseOrdersRequest,
  GetAppBaseOrdersResponse,
  GetAppOrdersRequest,
  GetAppOrdersResponse
} from './types'

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
    }
  }
})

export * from './types'
