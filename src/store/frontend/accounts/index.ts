import { defineStore } from 'pinia'
import { doAction } from '../../action'
import { API } from './const'
import {
  AccountState,
  DeleteWithdrawAddressRequest,
  DeleteWithdrawAddressResponse,
  GetWithdrawAccountsRequest,
  GetWithdrawAccountsResponse,
  SetWithdrawAddressRequest,
  SetWithdrawAddressResponse
} from './types'

export const useAccountStore = defineStore('account', {
  state: (): AccountState => ({
    Accounts: []
  }),
  getters: {},
  actions: {
    getWithdrawAccounts (req: GetWithdrawAccountsRequest) {
      doAction<GetWithdrawAccountsRequest, GetWithdrawAccountsResponse>(
        API.GET_WITHDRAW_ACCOUNTS,
        req,
        req.Message,
        (resp: GetWithdrawAccountsResponse): void => {
          this.Accounts = resp.Infos
        })
    },

    setWithdrawAddress (req: SetWithdrawAddressRequest, done: () => void) {
      doAction<SetWithdrawAddressRequest, SetWithdrawAddressResponse>(
        API.SET_WITHDRAW_ADDRESS,
        req,
        req.NotifyMessage,
        (resp: SetWithdrawAddressResponse): void => {
          this.Accounts.push(resp.Info)
          done()
        })
    },

    deleteWithdrawAddress (req: DeleteWithdrawAddressRequest) {
      doAction<DeleteWithdrawAddressRequest, DeleteWithdrawAddressResponse>(
        API.DELETE_WITHDRAW_ADDRESS,
        req,
        req.Message,
        (resp: DeleteWithdrawAddressResponse): void => {
          for (let i = 0; i < this.Accounts.length; i++) {
            if (this.Accounts[i].Address.ID === resp.Info.ID) {
              this.Accounts.splice(i, 1)
              return
            }
          }
        })
    }
  }
})

export * from './types'
