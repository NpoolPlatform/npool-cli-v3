import { defineStore } from 'pinia'
import { 
  GetAppUserAccountsRequest,
  GetAppUserAccountsResponse,
  GetDepositAccountsRequest,
  GetDepositAccountsResponse
} from './types'
import { doActionWithError } from '../../../action'
import { Account, AccountUsedFor } from '../../../base'
import { API } from './const'

export const useAdminUserAccountStore = defineStore('frontend-useraccount-v4', {
  state: () => ({
    UserAccounts: {
      UserAccounts: new Map<AccountUsedFor, Array<Account>>(), 
      Total: 0
    }
  }),
  getters: {
    getAccountsByKey() {
      return (key: AccountUsedFor) => {
        const data = this.UserAccounts.UserAccounts.get(key)
        return !data ? [] as Array<Account> : data
      }
    },
    withdrawAddress(): Array<Account>  {
      return this.getAccountsByKey(AccountUsedFor.UserWithdraw).sort((a,b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
    }
  },
  actions: {
    getAppUserAccounts (req: GetAppUserAccountsRequest, done: (accounts: Array<Account>, error: boolean) => void) {
      doActionWithError<GetAppUserAccountsRequest, GetAppUserAccountsResponse>(
        API.GET_APP_USERACCOUNTS,
        req,
        req.Message,
        (resp: GetAppUserAccountsResponse): void => {
          resp.Infos.forEach((el) => {
            const data = this.getAccountsByKey(el.UsedFor)
            data.push(el)
            this.UserAccounts.UserAccounts.set(el.UsedFor, data)
          })
          this.UserAccounts.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    },
    getDepositAccounts (req: GetDepositAccountsRequest, done: (accounts: Array<Account>, error: boolean) => void) {
      doActionWithError<GetDepositAccountsRequest, GetDepositAccountsResponse>(
        API.GET_APP_USERACCOUNTS,
        req,
        req.Message,
        (resp: GetDepositAccountsResponse): void => {
          const data = this.getAccountsByKey(AccountUsedFor.UserDeposit)
          data.push(...resp.Infos)
          this.UserAccounts.UserAccounts.set(AccountUsedFor.UserDeposit, data)
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    }
  }
})
