import { defineStore } from 'pinia'
import { 
  GetAppTransferAccountsRequest, 
  GetAppTransferAccountsResponse
} from './types'
import { doActionWithError } from '../../../action'
import { TransferAccount } from '../../../base'
import { API } from './const'

export const useAdminTransferAccountStore = defineStore('admin-transferaccount-v4', {
  state: () => ({
    TransferAccounts: {
      TransferAccounts: [] as Array<TransferAccount>,
      Total: 0
    }
  }),
  getters: {
    
  },
  actions: {
    getAppTransfers (req: GetAppTransferAccountsRequest, done: (trans: Array<TransferAccount>, error: boolean) => void) {
      doActionWithError<GetAppTransferAccountsRequest, GetAppTransferAccountsResponse>(
        API.GET_APP_TRANSFERS,
        req,
        req.Message,
        (resp: GetAppTransferAccountsResponse): void => {
          this.TransferAccounts.TransferAccounts.push(...resp.Infos)
          this.TransferAccounts.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    }
  }
})
