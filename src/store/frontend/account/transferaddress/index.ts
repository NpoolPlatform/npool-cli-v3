import { defineStore } from 'pinia'
import { 
  CreateTransferAddressRequest, 
  CreateTransferAddressResponse,
  DeleteTransferAddressRequest, 
  DeleteTransferAddressResponse, 
  GetTransferAddressesRequest, 
  GetTransferAddressesResponse 
} from './types'
import { doActionWithError } from '../../../action'
import { TransferAddress } from '../../../base'
import { API } from './const'

export const useFrontendTransferAddressStore = defineStore('frontend-transferaddress-v4', {
  state: () => ({
    TransferAddress: {
      TransferAddress: [] as Array<TransferAddress>,
      Total: 0
    }
  }),
  getters: {
    
  },
  actions: {
    createTransfer (req: CreateTransferAddressRequest, done: (trans: TransferAddress, error: boolean) => void) {
      doActionWithError<CreateTransferAddressRequest, CreateTransferAddressResponse>(
        API.CREATE_TRANSFER,
        req,
        req.Message,
        (resp: CreateTransferAddressResponse): void => {
          this.TransferAddress.TransferAddress.splice(0, 0, resp.Info)
          this.TransferAddress.Total += 1
          done(resp.Info, false)
        }, () => {
          done({} as TransferAddress, true)
      })
    },
    deleteTransfer (req: DeleteTransferAddressRequest, done: (trans: TransferAddress, error: boolean) => void) {
      doActionWithError<DeleteTransferAddressRequest, DeleteTransferAddressResponse>(
        API.DELETE_TRANSFER,
        req,
        req.Message,
        (resp: DeleteTransferAddressResponse): void => {
          const index = this.TransferAddress.TransferAddress.findIndex((el) => el.ID === resp.Info.ID)
          if (index < 0) {
            return 
          }
          this.TransferAddress.TransferAddress.splice(index, 1)
          this.TransferAddress.Total -= 1
          done(resp.Info, false)
        }, () => {
          done({} as TransferAddress, true)
      })
    },
    getTransfers (req: GetTransferAddressesRequest, done: (trans: Array<TransferAddress>, error: boolean) => void) {
      doActionWithError<GetTransferAddressesRequest, GetTransferAddressesResponse>(
        API.GET_TRANSFERS,
        req,
        req.Message,
        (resp: GetTransferAddressesResponse): void => {
          this.TransferAddress.TransferAddress.push(...resp.Infos)
          this.TransferAddress.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
      })
    }
  }
})
