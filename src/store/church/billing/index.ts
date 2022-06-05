import { defineStore } from 'pinia'
import { BillingState } from './state'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { Benefit, Payment, Transaction, UserWithdraw } from '../../frontend'
import { UserPaymentBalance } from '../../frontend'
import {
  GetAppPaymentsResponse,
  GetAppPaymentsRequest,
  GetTargetAppPaymentBalancesRequest,
  GetTargetAppPaymentBalancesResponse,
  GetAppUserBenefitsResponse,
  GetTargetAppTransactionsRequest,
  GetTargetAppTransactionsResponse,
  GetAppWithdrawsRequest,
  GetAppWithdrawsResponse,
  GetPlatformBenefitsRequest,
  GetPlatformBenefitsResponse,
  CreateTargetAppUserPaymentBalanceRequest
} from './types'
import { CreateTargetAppUserPaymentBalanceResponse, GetAppUserBenefitsRequest } from '..'

export const useChurchBillingStore = defineStore('churchbilling', {
  state: (): BillingState => ({
    Payments: new Map<string, Array<Payment>>(),
    PaymentBalances: new Map<string, Array<UserPaymentBalance>>(),
    UserBenefits: new Map<string, Array<Benefit>>(),
    PlatformBenefits: [],
    Withdraws: new Map<string, Array<UserWithdraw>>(),
    Transactions: new Map<string, Array<Transaction>>()
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
    getPaymentBalances (req: GetTargetAppPaymentBalancesRequest, done: (error: boolean) => void) {
      doActionWithError<GetTargetAppPaymentBalancesRequest, GetTargetAppPaymentBalancesResponse>(
        API.GET_USER_PAYMENT_BALANCES,
        req,
        req.Message,
        (resp: GetTargetAppPaymentBalancesResponse): void => {
          this.PaymentBalances.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    createPaymentBalance (req: CreateTargetAppUserPaymentBalanceRequest, done: () => void) {
      doAction<CreateTargetAppUserPaymentBalanceRequest, CreateTargetAppUserPaymentBalanceResponse>(
        API.CREATE_USER_PAYMENT_BALANCE,
        req,
        req.Message,
        (resp: CreateTargetAppUserPaymentBalanceResponse): void => {
          let infos = this.PaymentBalances.get(req.TargetAppID)
          if (!infos) {
            infos = [] as Array<UserPaymentBalance>
          }
          infos.push(resp.Info)
          this.PaymentBalances.set(req.TargetAppID, infos)
          done()
        })
    },
    getUserBenefits (req: GetAppUserBenefitsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppUserBenefitsRequest, GetAppUserBenefitsResponse>(
        API.GET_USER_BENEFITS,
        req,
        req.Message,
        (resp: GetAppUserBenefitsResponse): void => {
          this.UserBenefits.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    getTransactions (req: GetTargetAppTransactionsRequest, done: (error: boolean) => void) {
      doActionWithError<GetTargetAppTransactionsRequest, GetTargetAppTransactionsResponse>(
        API.GET_COIN_ACCOUNT_TRANSACTIONS,
        req,
        req.Message,
        (resp: GetTargetAppTransactionsResponse): void => {
          this.Transactions.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    getWithdraws (req: GetAppWithdrawsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppWithdrawsRequest, GetAppWithdrawsResponse>(
        API.GET_USER_WITHDRAW_ITEMS,
        req,
        req.Message,
        (resp: GetAppWithdrawsResponse): void => {
          this.Withdraws.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    getPlatformBenefits (req: GetPlatformBenefitsRequest, done: (error: boolean) => void) {
      doActionWithError<GetPlatformBenefitsRequest, GetPlatformBenefitsResponse>(
        API.GET_PLATFORM_BENEFITS,
        req,
        req.Message,
        (resp: GetPlatformBenefitsResponse): void => {
          this.PlatformBenefits =resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
