import { defineStore } from 'pinia'
import { Withdraw } from '../../../base'
import { doActionWithError } from '../../../action'
import { API } from './const'
import {
  CreateWithdrawRequest,
  CreateWithdrawResponse,
  GetWithdrawsRequest,
  GetWithdrawsResponse,
} from './types'


export const useFrontendWithdrawStore = defineStore('frontend-withdraw-v4', {
  state: () => ({
    Withdraws: {
      Withdraws: [] as Array<Withdraw>,
      Total: 0
    }
  }),
  getters: {
    withdraws (): Array<Withdraw> {
      return this.Withdraws.Withdraws.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
    },
  },
  actions: {
    getWithdraws (req: GetWithdrawsRequest, done: (error: boolean, rows: Array<Withdraw>) => void) {
      doActionWithError<GetWithdrawsRequest, GetWithdrawsResponse>(
        API.GET_WITHDRAWS,
        req,
        req.Message,
        (resp: GetWithdrawsResponse): void => {
          this.Withdraws.Withdraws.push(...resp.Infos)
          this.Withdraws.Total = resp.Total
          done(false, resp.Infos)
        },
        () => {
          done(true, [] as Array<Withdraw>)
        }
      )
    },
    createWithdraw (req: CreateWithdrawRequest, done: (error: boolean, row: Withdraw) => void) {
      doActionWithError<CreateWithdrawRequest, CreateWithdrawResponse>(
        API.CREATE_WITHDRAW,
        req,
        req.Message,
        (resp: CreateWithdrawResponse): void => {
          this.Withdraws.Withdraws.splice(0, 0, resp.Info)
          this.Withdraws.Total += 1
          done(false, resp.Info)
        },
        () => {
          done(true, {} as Withdraw)
        }
      )
    }
  }
})
