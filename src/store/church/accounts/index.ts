import { defineStore } from 'pinia'
import { doActionWithError } from '../../action'
import { API } from './const'
import { AccountState } from './state'
import {
  GetAccountsRequest,
  GetAccountsResponse
} from './types'

export const useChurchAccountStore = defineStore('churchaccount', {
  state: (): AccountState => ({
    Accounts: []
  }),
  getters: {},
  actions: {
    getAccounts (req: GetAccountsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAccountsRequest, GetAccountsResponse>(
        API.GET_ACCOUNTS,
        req,
        req.Message,
        (resp: GetAccountsResponse): void => {
          this.Accounts = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})