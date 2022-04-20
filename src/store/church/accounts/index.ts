import { defineStore } from 'pinia'
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