import { defineStore } from 'pinia'
import { doActionWithError } from '../../action'
import { API } from './const'
import {
  BillingState,
  GetUserPaymentBalancesRequest,
  GetUserPaymentBalancesResponse
} from './types'

export const useBillingStore = defineStore('billing', {
  state: (): BillingState => ({
    PaymentBalances: []
  }),
  getters: {},
  actions: {
    getPaymentBalances (req: GetUserPaymentBalancesRequest, done: (error: boolean) => void) {
      doActionWithError<GetUserPaymentBalancesRequest, GetUserPaymentBalancesResponse>(
        API.GET_USER_PAYMENT_BALANCES,
        req,
        req.Message,
        (resp: GetUserPaymentBalancesResponse): void => {
          this.PaymentBalances = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
