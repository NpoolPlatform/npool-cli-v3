import { defineStore } from 'pinia'
import { BillingState } from './state'
import { doActionWithError } from '../../action'
import { API } from './const'
import { Payment } from '../../frontend'
import { UserPaymentBalance } from '../../admin'
import {
  GetAppPaymentsResponse,
  GetAppPaymentsRequest,
  GetAppPaymentBalancesRequest,
  GetAppPaymentBalancesResponse
} from './types'

export const useChurchBillingStore = defineStore('churchbilling', {
  state: (): BillingState => ({
    Payments: new Map<string, Array<Payment>>(),
    PaymentBalances: new Map<string, Array<UserPaymentBalance>>()
  }),
  getters: {},
  actions: {
    getPayments (req: GetAppPaymentsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppPaymentsRequest, GetAppPaymentsResponse>(
        API.GET_PAYMENTS,
        req,
        req.Message,
        (resp: GetAppPaymentsResponse): void => {
          this.Payments.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    getPaymentBalances (req: GetAppPaymentBalancesRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppPaymentBalancesRequest, GetAppPaymentBalancesResponse>(
        API.GET_USER_PAYMENT_BALANCES,
        req,
        req.Message,
        (resp: GetAppPaymentBalancesResponse): void => {
          this.PaymentBalances.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
