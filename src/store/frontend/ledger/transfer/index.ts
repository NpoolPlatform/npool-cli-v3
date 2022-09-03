import { defineStore } from 'pinia'
import { 
  CreateTransferRequest, 
  CreateTransferResponse
} from './types'
import { doActionWithError } from '../../../action'
import { Transfer } from '../../../base'
import { API } from './const'

export const useFrontendTransferStore = defineStore('frontend-transfer-v4', {
  state: () => ({
    Transfer: {
      Transfer: [] as Array<Transfer>,
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
          this.Transfer.Transfer.splice(0, 0, resp.Info)
          this.Transfer.Total += 1
          done(resp.Info, false)
        }, () => {
          done({} as Transfer, true)
      })
    }
  }
})
