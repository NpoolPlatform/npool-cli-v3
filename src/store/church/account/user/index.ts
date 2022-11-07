import { doActionWithError } from '../../../action'
import { defineStore } from 'pinia'
import { API } from './const'
import { Account, AccountUsedFor } from '../../../base'
import { 
  GetAppDepositAccountsRequest,
  GetAppDepositAccountsResponse,
  GetNAppUserAccountsRequest,
  GetNAppUserAccountsResponse
} from './types'

export const useChurchUserAccountStore = defineStore('church-useraccount-v4', {
  state: () => ({
    DepositAccounts: {
      DepositAccounts: new Map<string, Array<Account>>(),
      Total: 0
    },
    UserAccounts: {
      UserAccounts:  new Map<string, Array<Account>>(),
      Total: 0
    }
  }),
  getters: {
    getDepositAccountsByAppID() : (appID: string) => Array<Account> {
      return (appID: string) => {
        const data = this.DepositAccounts.DepositAccounts.get(appID)
        return !data ? [] as Array<Account> : data
      }
    },
    getDepositAccountsByAppIDAndUserID() : (appID: string, userID: string) => Array<Account> {
      return (appID: string, userID: string) => {
        const data = this.DepositAccounts.DepositAccounts.get(appID)
        return !data ? [] : data.filter((el) => el.UserID === userID)
      }
    },
    getUserAccountsByAppID() : (appID: string) => Array<Account> {
      return (appID: string) => {
        const data = this.UserAccounts.UserAccounts.get(appID)
        return !data? [] as Array<Account> : data
      }
    },
    withdrawAddress () {
      return (appID: string) => this.getUserAccountsByAppID(appID).filter((el) => el.UsedFor === AccountUsedFor.UserWithdraw)
    },
    directBenefitAddress () {
      return (appID: string) => this.getUserAccountsByAppID(appID).filter((el) => el.UsedFor === AccountUsedFor.UserDirectBenefit)
    }
  },
  actions: {
    getAppDepositAccounts(req: GetAppDepositAccountsRequest, done: (accounts: Array<Account>, error: boolean) => void) {
      doActionWithError<GetAppDepositAccountsRequest, GetAppDepositAccountsResponse>(
        API.GET_APP_DEPOSITACCOUNTS,
        req,
        req.Message,
        (resp: GetAppDepositAccountsResponse): void => {
          const data = this.getDepositAccountsByAppID(req.TargetAppID)
          data.push(...resp.Infos)
          this.DepositAccounts.DepositAccounts.set(req.TargetAppID, data)
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    },
    getNAppUserAccounts(req: GetNAppUserAccountsRequest, done: (accounts: Array<Account>, error: boolean) => void) {
      doActionWithError<GetNAppUserAccountsRequest, GetNAppUserAccountsResponse>(
        API.GET_N_APP_USERACCOUNTS,
        req,
        req.Message,
        (resp: GetNAppUserAccountsResponse): void => {
          const data = this.getUserAccountsByAppID(req.TargetAppID)
          data.push(...resp.Infos)
          this.UserAccounts.UserAccounts.set(req.TargetAppID, data)
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    }
  }
})
