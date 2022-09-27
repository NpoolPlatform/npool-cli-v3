import { doActionWithError } from '../../../action'
import { defineStore } from 'pinia'
import { API } from './const'
import { Account } from '../../../base'
import { 
  GetAppDepositAccountsRequest,
  GetAppDepositAccountsResponse
} from './types'

export const useChurchAccountStore = defineStore('church-account-v4', {
  state: () => ({
    Accounts: {
      Accounts: new Map<string, Array<Account>>(),
      Total: 0
    }
  }),
  getters: {
    getAppAccounts() : (appID: string) => Array<Account> {
      return (appID: string) => {
        const data = this.Accounts.Accounts.get(appID)
        return !data ? [] as Array<Account> : data
      }
    },
    getUserAccounts() : (appID: string, userID: string) => Array<Account> {
      return (appID: string, userID: string) => {
        const data = this.Accounts.Accounts.get(appID)
        return !data ? [] : data.filter((el) => el.UserID === userID)
      }
    }
  },
  actions: {
    getAppAccounts(req: GetAppDepositAccountsRequest, done: (accounts: Array<Account>, error: boolean) => void) {
      doActionWithError<GetAppDepositAccountsRequest, GetAppDepositAccountsResponse>(
        API.GET_APP_DEPOSITACCOUNTS,
        req,
        req.Message,
        (resp: GetAppDepositAccountsResponse): void => {
          const accounts = this.getAppAccounts(req.TargetAppID)
          accounts.push(...resp.Infos)
          this.Accounts.Accounts.set(req.TargetAppID, accounts)
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    }
  }
})
