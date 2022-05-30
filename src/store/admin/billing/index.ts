import { defineStore } from 'pinia'
import { doActionWithError } from '../../action'
import { API } from './const'
import {
  BillingState
} from './state'
import {
  GetPaymentsRequest,
  GetPaymentsResponse,
  GetUserBenefitsRequest,
  GetUserBenefitsResponse,
  GetAppPaymentBalancesRequest,
  GetAppPaymentBalancesResponse,
  GetWithdrawsRequest,
  GetWithdrawsResponse,
  GetAppTransactionsRequest,
  GetAppTransactionsResponse
} from './types'

export const useAdminBillingStore = defineStore('adminbilling', {
  state: (): BillingState => ({
    UserBenefits: [],
    Transactions: [],
    Payments: [],
    PaymentBalances: [],
    Withdraws: []
  }),
  getters: {},
  actions: {
    getUserBenefits (req: GetUserBenefitsRequest, done: (error: boolean) => void) {
      doActionWithError<GetUserBenefitsRequest, GetUserBenefitsResponse>(
        API.GET_USER_BENEFITS,
        req,
        req.Message,
        (resp: GetUserBenefitsResponse): void => {
          this.UserBenefits = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    getTransactions (req: GetAppTransactionsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppTransactionsRequest, GetAppTransactionsResponse>(
        API.GET_COIN_ACCOUNT_TRANSACTIONS,
        req,
        req.Message,
        (resp: GetAppTransactionsResponse): void => {
          this.Transactions = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    getPayments (req: GetPaymentsRequest, done: (error: boolean) => void) {
      doActionWithError<GetPaymentsRequest, GetPaymentsResponse>(
        API.GET_PAYMENTS,
        req,
        req.Message,
        (resp: GetPaymentsResponse): void => {
          this.Payments = resp.Infos
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
          this.PaymentBalances = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    getWithdraws (req: GetWithdrawsRequest, done: (error: boolean) => void) {
      doActionWithError<GetWithdrawsRequest, GetWithdrawsResponse>(
        API.GET_USER_WITHDRAW_ITEMS,
        req,
        req.Message,
        (resp: GetWithdrawsResponse): void => {
          this.Withdraws = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
