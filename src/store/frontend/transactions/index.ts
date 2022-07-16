import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import {
  GetTransactionsRequest,
  GetTransactionsResponse,
  GetUserWithdrawsRequest,
  GetUserWithdrawsResponse,
  SubmitUserWithdrawRequest,
  SubmitUserWithdrawResponse,
  TransactionState,
  UserWithdrawState
} from './types'

export const useTransactionStore = defineStore('transaction', {
  state: (): TransactionState => ({
    Transactions: [],
    Withdraws: []
  }),
  getters: {},
  actions: {
    getTransactions (req: GetTransactionsRequest, done: () => void) {
      doAction<GetTransactionsRequest, GetTransactionsResponse>(
        API.GET_TRANSACTIONS,
        req,
        req.Message,
        (resp: GetTransactionsResponse): void => {
          this.Transactions = resp.Infos
          done()
        })
    },
    submitWithdraw (req: SubmitUserWithdrawRequest, done: (error: boolean, withdraw: UserWithdrawState) => void) {
      doActionWithError<SubmitUserWithdrawRequest, SubmitUserWithdrawResponse>(
        API.SUBMIT_WITHDRAW,
        req,
        req.Message,
        (resp: SubmitUserWithdrawResponse): void => {
          this.Withdraws.splice(0, 0, resp.Info)
          done(false, resp.Info)
        }, () => {
          done(true, undefined as unknown as UserWithdrawState)
        })
    },
    getWithdraws (req: GetUserWithdrawsRequest, done: () => void) {
      doAction<GetUserWithdrawsRequest, GetUserWithdrawsResponse>(
        API.GET_WITHDRAWS,
        req,
        req.Message,
        (resp: GetUserWithdrawsResponse): void => {
          this.Withdraws = resp.Infos
          done()
        })
    }
  }
})

export * from './types'
export { WithdrawType, TransactionState } from './const'
