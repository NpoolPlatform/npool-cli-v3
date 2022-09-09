import { doActionWithError } from '../../../action'
import { defineStore } from 'pinia'
import { API } from './const'
import { Detail, General} from '../../../base'
import { 
  CreateAppUserDepositRequest,
  CreateAppUserDepositResponse
} from './types'

export const useChurchDepositStore = defineStore('church-deposit-v4', {
  state: () => ({
    Generals: {
      Generals: new Map<string, Array<General>>(),
      Total: 0
    },
    Details: {
      Details: new Map<string, Array<Detail>>(),
      Total: 0
    }
  }),
  getters: {
    targetUserDetails() : (userID: string) => Array<Detail> {
      return (userID: string) => {
        const data = this.Details.Details.get(userID)
        return !data ? [] as Array<Detail> : data
      }
    },
    targetUserGenerals() : (userID: string) => Array<General> {
      return (userID: string) => {
        const data = this.Generals.Generals.get(userID)
        return !data ? [] as Array<General> : data
      }
    }
  },
  actions: {
    createAppUserDeposit (req: CreateAppUserDepositRequest, done: (detail: Detail, error: boolean) => void) {
      doActionWithError<CreateAppUserDepositRequest, CreateAppUserDepositResponse>(
        API.CREATE_APP_USER_DEPOSIT,
        req,
        req.Message,
        (resp: CreateAppUserDepositResponse): void => {
          const details = this.targetUserDetails(req.TargetUserID)
          details.push(resp.Info)
          this.Details.Details.set(req.TargetUserID, details)
          done(resp.Info, false)
        }, () => {
          done({} as Detail, true)
        })
    },
    // getAppUserGenerals()
  }
})
