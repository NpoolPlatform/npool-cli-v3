import { doActionWithError } from '../../../action'
import { defineStore } from 'pinia'
import { API } from './const'
import { PlatformAccount } from '../../../base'
import { 
  GetPaymentAccountsRequest,
  GetPaymentAccountsResponse,
  UpdatePaymentAccountRequest,
  UpdatePaymentAccountResponse,
} from './types'

export const useChurchPaymentAccountStore = defineStore('church-paymentaccount-v4', {
  state: () => ({
    PaymentAccounts: {
      PaymentAccounts:  [] as Array<PlatformAccount>,
      Total: 0
    }
  }),
  getters: {},
  actions: {
    getPaymentAccounts(req: GetPaymentAccountsRequest, done: (accounts: Array<PlatformAccount>, error: boolean) => void) {
      doActionWithError<GetPaymentAccountsRequest, GetPaymentAccountsResponse>(
        API.GET_PAYMENTACCOUNTS,
        req,
        req.Message,
        (resp: GetPaymentAccountsResponse): void => {
          this.PaymentAccounts.PaymentAccounts.push(...resp.Infos)
          this.PaymentAccounts.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    },
    updatePaymentAccounts(req: UpdatePaymentAccountRequest, done: (account: PlatformAccount, error: boolean) => void) {
      doActionWithError<UpdatePaymentAccountRequest, UpdatePaymentAccountResponse>(
        API.UPDATE_PAYMENTACCOUNT,
        req,
        req.Message,
        (resp: UpdatePaymentAccountResponse): void => {
          const index = this.PaymentAccounts.PaymentAccounts.findIndex((el) => el.ID === resp.Info.ID)
          this.PaymentAccounts.PaymentAccounts.splice(index, 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as PlatformAccount, true)
      })
    }
  }
})
