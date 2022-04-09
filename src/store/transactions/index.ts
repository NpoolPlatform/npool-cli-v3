import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../action'
import { API } from './const'
import {
  GetTransactionsRequest,
  GetTransactionsResponse,
  SubmitUserWithdrawRequest,
  SubmitUserWithdrawResponse,
  TransactionState
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
    submitWithdraw (req: SubmitUserWithdrawRequest, done: (error: boolean) => void) {
      doActionWithError<SubmitUserWithdrawRequest, SubmitUserWithdrawResponse>(
        API.SUBMIT_WITHDRAW,
        req,
        req.Message,
        (resp: SubmitUserWithdrawResponse): void => {
          this.Transactions.splice(0, 0, resp.Info)
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
