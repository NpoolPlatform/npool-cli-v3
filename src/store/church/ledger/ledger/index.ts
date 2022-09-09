import { doActionWithError } from '../../../action'
import { defineStore } from 'pinia'
import { API } from './const'
import { Detail} from '../../../base'
import { 
  CreateAppUserDepositRequest,
  CreateAppUserDepositResponse
} from './types'

export const useChurchDepositStore = defineStore('church-deposit-v4', {
  state: () => ({
    DepositRecords: {
      DepositRecords: [] as Array<Detail>
    }
  }),
  getters: {},
  actions: {
    createAppUserDeposit (req: CreateAppUserDepositRequest, done: (detail: Detail, error: boolean) => void) {
      doActionWithError<CreateAppUserDepositRequest, CreateAppUserDepositResponse>(
        API.CREATE_APP_USER_DEPOSIT,
        req,
        req.Message,
        (resp: CreateAppUserDepositResponse): void => {
          this.DepositRecords.DepositRecords.push(resp.Info)
          done(resp.Info, false)
        }, () => {
          done({} as Detail, true)
        })
    }
  }
})
