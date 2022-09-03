import { defineStore } from 'pinia'
import { CreateTransferRequest, CreateTransferResponse, DeleteTransferRequest, DeleteTransferResponse, GetTransfersRequest, GetTransfersResponse } from './types'
import { doActionWithError } from '../../../action'
import { Transfer } from '../../../base'
import { API } from './const'

export const useFrontendTransferStore = defineStore('frontend-transfer-v4', {
  state: () => ({
    Transfers: {
      Transfers: [] as Array<Transfer>,
      Total: 0
    }
  }),
  getters: {
    
  },
  actions: {
    createTransfer (req: CreateTransferRequest, done: (trans: Transfer, error: boolean) => void) {
      doActionWithError<CreateTransferRequest, CreateTransferResponse>(
        API.CREATE_TRANSFER,
        req,
        req.Message,
        (resp: CreateTransferResponse): void => {
          this.Transfers.Transfers.splice(0, 0, resp.Info)
          this.Transfers.Total += 1
          done(resp.Info, false)
        }, () => {
          done({} as Transfer, true)
      })
    },
    deleteTransfer (req: DeleteTransferRequest, done: (trans: Transfer, error: boolean) => void) {
      doActionWithError<DeleteTransferRequest, DeleteTransferResponse>(
        API.DELETE_TRANSFER,
        req,
        req.Message,
        (resp: DeleteTransferResponse): void => {
          const index = this.Transfers.Transfers.findIndex((el) => el.ID === resp.Info.ID)
          this.Transfers.Transfers.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          this.Transfers.Total -= 1
          done(resp.Info, false)
        }, () => {
          done({} as Transfer, true)
      })
    },
    getTransfers (req: GetTransfersRequest, done: (trans: Array<Transfer>, error: boolean) => void) {
      doActionWithError<GetTransfersRequest, GetTransfersResponse>(
        API.GET_TRANSFERS,
        req,
        req.Message,
        (resp: GetTransfersResponse): void => {
          this.Transfers.Transfers.push(...resp.Infos)
          this.Transfers.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    }
  }
})

export * from './const'
export * from './types'