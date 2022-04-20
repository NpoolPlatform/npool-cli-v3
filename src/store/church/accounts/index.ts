import { defineStore } from 'pinia'
import { Account } from '../../frontend'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { AccountState } from './state'
import {
  CreatePlatformAccountRequest,
  CreatePlatformAccountResponse,
  CreateUserAccountRequest,
  CreateUserAccountResponse,
  GetAccountsRequest,
  GetAccountsResponse
} from './types'

export const useChurchAccountStore = defineStore('churchaccount', {
  state: (): AccountState => ({
    Accounts: []
  }),
  getters: {
    getAccountByID (): (id: string) => Account {
      return (id: string) => {
        const index = this.Accounts.findIndex((el) => el.ID === id)
        return index < 0 ? undefined as unknown as Account : this.Accounts[index]
      }
    }
  },
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
    },
    createPlatformAccount (req: CreatePlatformAccountRequest, done: () => void) {
      doAction<CreatePlatformAccountRequest, CreatePlatformAccountResponse>(
        API.CREATE_PLATFORM_ACCOUNT,
        req,
        req.Message,
        (resp: CreatePlatformAccountResponse): void => {
          this.Accounts.splice(0, 0, resp.Info)
          done()
        })
    },
    createUserAccount (req: CreateUserAccountRequest, done: () => void) {
      doAction<CreateUserAccountRequest, CreateUserAccountResponse>(
        API.CREATE_USER_ACCOUNT,
        req,
        req.Message,
        (resp: CreateUserAccountResponse): void => {
          this.Accounts.splice(0, 0, resp.Info)
          done()
        })
    }
  }
})