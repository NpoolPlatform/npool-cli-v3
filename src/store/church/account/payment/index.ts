import { doActionWithError } from '../../../action'
import { defineStore } from 'pinia'
import { API } from './const'
import { PaymentAccount } from '../../../base'
import { 
  GetPaymentAccountsRequest,
  GetPaymentAccountsResponse,
  UpdatePaymentAccountRequest,
  UpdatePaymentAccountResponse,
} from './types'

export const useChurchPaymentAccountStore = defineStore('church-paymentaccount-v4', {
  state: () => ({
    PaymentAccounts: {
      PaymentAccounts:  [] as Array<PaymentAccount>,
      Total: 0
    }
  }),
  getters: {},
  actions: {
    getPaymentAccounts(req: GetPaymentAccountsRequest, done: (accounts: Array<PaymentAccount>, error: boolean) => void) {
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
    updatePaymentAccount(req: UpdatePaymentAccountRequest, done: (account: PaymentAccount, error: boolean) => void) {
      doActionWithError<UpdatePaymentAccountRequest, UpdatePaymentAccountResponse>(
        API.UPDATE_PAYMENTACCOUNT,
        req,
        req.Message,
        (resp: UpdatePaymentAccountResponse): void => {
          const index = this.PaymentAccounts.PaymentAccounts.findIndex((el) => el.ID === resp.Info.ID)
          this.PaymentAccounts.PaymentAccounts.splice(index, 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as PaymentAccount, true)
      })
    }
  }
})
