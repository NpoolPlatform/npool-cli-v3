import { defineStore } from 'pinia'
import { 
  CreateTransferAccountRequest, 
  CreateTransferAccountResponse,
  DeleteTransferAccountRequest, 
  DeleteTransferAccountResponse, 
  GetTransferAccountsRequest, 
  GetTransferAccountsResponse 
} from './types'
import { doActionWithError } from '../../../action'
import { TransferAccount } from '../../../base'
import { API } from './const'

export const useFrontendTransferAccountStore = defineStore('frontend-transferaccount-v4', {
  state: () => ({
    TransferAccounts: {
      TransferAccounts: [] as Array<TransferAccount>,
      Total: 0
    }
  }),
  getters: {
    
  },
  actions: {
    createTransfer (req: CreateTransferAccountRequest, done: (trans: TransferAccount, error: boolean) => void) {
      doActionWithError<CreateTransferAccountRequest, CreateTransferAccountResponse>(
        API.CREATE_TRANSFER,
        req,
        req.Message,
        (resp: CreateTransferAccountResponse): void => {
          this.TransferAccounts.TransferAccounts.splice(0, 0, resp.Info)
          this.TransferAccounts.Total += 1
          done(resp.Info, false)
        }, () => {
          done({} as TransferAccount, true)
      })
    },
    deleteTransfer (req: DeleteTransferAccountRequest, done: (trans: TransferAccount, error: boolean) => void) {
      doActionWithError<DeleteTransferAccountRequest, DeleteTransferAccountResponse>(
        API.DELETE_TRANSFER,
        req,
        req.Message,
        (resp: DeleteTransferAccountResponse): void => {
          const index = this.TransferAccounts.TransferAccounts.findIndex((el) => el.ID === resp.Info.ID)
          this.TransferAccounts.TransferAccounts.splice(index, 1)
          this.TransferAccounts.Total -= 1
          done(resp.Info, false)
        }, () => {
          done({} as TransferAccount, true)
      })
    },
    getTransfers (req: GetTransferAccountsRequest, done: (trans: Array<TransferAccount>, error: boolean) => void) {
      doActionWithError<GetTransferAccountsRequest, GetTransferAccountsResponse>(
        API.GET_TRANSFERS,
        req,
        req.Message,
        (resp: GetTransferAccountsResponse): void => {
          this.TransferAccounts.TransferAccounts.push(...resp.Infos)
          this.TransferAccounts.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    }
  }
})
