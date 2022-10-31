import { defineStore } from 'pinia'
import { 
  CreateUserAccountRequest, 
  CreateUserAccountResponse,
  DeleteUserAccountRequest, 
  DeleteUserAccountResponse, 
  GetUserAccountsRequest, 
  GetUserAccountsResponse,
  GetDepositAccountRequest,
  GetDepositAccountResponse,
} from './types'
import { doActionWithError } from '../../../action'
import { Account, AccountUsedFor } from '../../../base'
import { API } from './const'

export const useFrontendUserAccountStore = defineStore('frontend-useraccount-v4', {
  state: () => ({
    UserAccounts: {
      UserAccounts: [] as Array<Account>, // Only WithdrawAddress In Frontend
      Total: 0
    }
  }),
  getters: {
    withdrawAddress(): Array<Account> {
      return this.UserAccounts.UserAccounts.filter((el) => el.UsedFor === AccountUsedFor.UserWithdraw)
                                           .sort((a,b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
    }
  },
  actions: {
    createUserAccount (req: CreateUserAccountRequest, done: (account: Account, error: boolean) => void) {
      doActionWithError<CreateUserAccountRequest, CreateUserAccountResponse>(
        API.CREATE_USERACCOUNT,
        req,
        req.Message,
        (resp: CreateUserAccountResponse): void => {
          this.UserAccounts.UserAccounts.splice(0, 0, resp.Info)
          this.UserAccounts.Total += 1
          done(resp.Info, false)
        }, () => {
          done({} as Account, true)
      })
    },
    deleteUserAccount (req: DeleteUserAccountRequest, done: (account: Account, error: boolean) => void) {
      doActionWithError<DeleteUserAccountRequest, DeleteUserAccountResponse>(
        API.DELETE_USERACCOUNT,
        req,
        req.Message,
        (resp: DeleteUserAccountResponse): void => {
          const index = this.UserAccounts.UserAccounts.findIndex((el) => el.ID === resp.Info.ID)
          this.UserAccounts.UserAccounts.splice(index, 1)
          this.UserAccounts.Total -= 1
          done(resp.Info, false)
        }, () => {
          done({} as Account, true)
      })
    },
    getUserAccounts (req: GetUserAccountsRequest, done: (accounts: Array<Account>, error: boolean) => void) {
      doActionWithError<GetUserAccountsRequest, GetUserAccountsResponse>(
        API.GET_USERACCOUNTS,
        req,
        req.Message,
        (resp: GetUserAccountsResponse): void => {
          this.UserAccounts.UserAccounts.push(...resp.Infos)
          this.UserAccounts.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    },
    getDepositAccount (req: GetDepositAccountRequest, done: (account: Account, error: boolean) => void) {
      doActionWithError<GetDepositAccountRequest, GetDepositAccountResponse>(
        API.GET_DEPOSITACCOUNT,
        req,
        req.Message,
        (resp: GetDepositAccountResponse): void => {
          done(resp.Info, false)
        }, () => {
          done({} as Account, true)
      })
    },
  }
})
