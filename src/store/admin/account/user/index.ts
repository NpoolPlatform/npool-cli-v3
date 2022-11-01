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
      UserAccounts: [] as Array<Account>, 
      Total: 0
    }
  }),
  getters: {
    getAccountsByKey() {
      return (key: AccountUsedFor) => this.UserAccounts.UserAccounts.filter((el) => el.UsedFor === key)
    },
    withdrawAddress(): Array<Account>  {
      return this.getAccountsByKey(AccountUsedFor.UserWithdraw).sort((a,b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
    },
    depositAccounts(): Array<Account>  {
      return this.getAccountsByKey(AccountUsedFor.UserDeposit).sort((a,b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
    }
  },
  actions: {
    getAppUserAccounts (req: GetAppUserAccountsRequest, done: (accounts: Array<Account>, error: boolean) => void) {
      doActionWithError<GetAppUserAccountsRequest, GetAppUserAccountsResponse>(
        API.GET_APP_USERACCOUNTS,
        req,
        req.Message,
        (resp: GetAppUserAccountsResponse): void => {
          this.UserAccounts.UserAccounts.push(...resp.Infos)
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
          this.UserAccounts.UserAccounts.push(...resp.Infos)
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    }
  }
})
