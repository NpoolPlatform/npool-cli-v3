import { AxiosInstance } from 'axios'
import { defineStore } from 'pinia'
import { doAction } from '../action'
import { API } from './const'
import {
  AccountState,
  GetWithdrawAccountsRequest,
  GetWithdrawAccountsResponse,
  SetWithdrawAddressRequest,
  SetWithdrawAddressResponse
} from './types'

export const useAccountStore = defineStore('account', {
  state: (): AccountState => ({
    Accounts: [],
    APIInstance: undefined as unknown as AxiosInstance
  }),
  getters: {},
  actions: {
    getWithdrawAccounts (req: GetWithdrawAccountsRequest) {
      doAction<GetWithdrawAccountsRequest, GetWithdrawAccountsResponse>(
        this.APIInstance,
        API.GET_WITHDRAW_ACCOUNTS,
        req,
        req.Message,
        (resp: GetWithdrawAccountsResponse): void => {
          this.Accounts = resp.Infos
        })
    },

    setWithdrawAddress (req: SetWithdrawAddressRequest) {
      doAction<SetWithdrawAddressRequest, SetWithdrawAddressResponse>(
        this.APIInstance,
        API.SET_WITHDRAW_ADDRESS,
        req,
        req.NotifyMessage,
        (resp: SetWithdrawAddressResponse): void => {
          this.Accounts.push(resp.Info)
        })
    }
  }
})

export * from './types'
