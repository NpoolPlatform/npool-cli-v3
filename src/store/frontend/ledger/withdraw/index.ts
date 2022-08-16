import { defineStore } from 'pinia'
import { doActionWithError } from 'src/store/action'
import { API } from './const'
import {
  CreateWithdrawRequest,
  CreateWithdrawResponse,
  GetWithdrawsRequest,
  GetWithdrawsResponse,
  Withdraw
} from './types'

export const useWithdrawStore = defineStore('withdraw', {
  state: () => ({
    Withdraws: {
      Withdraws: [] as Array<Withdraw>,
      Total: 0
    }
  }),
  getters: {
    withdraws (): Array<Withdraw> {
      return this.Withdraws.Withdraws.sort((a, b) => a.CreatedAt > b.CreatedAt ? -1 : 1)
    }
  },
  actions: {
    getWithdraws (req: GetWithdrawsRequest, done: (error: boolean, count?: number) => void) {
      doActionWithError<GetWithdrawsRequest, GetWithdrawsResponse>(
        API.GET_WITHDRAWS,
        req,
        req.Message,
        (resp: GetWithdrawsResponse): void => {
          this.Withdraws.Withdraws.push(...resp.Infos)
          this.Withdraws.Total = resp.Total
          done(false, resp.Infos.length)
        },
        () => {
          done(true)
        }
      )
    },
    createWithdraw (req: CreateWithdrawRequest, done: (error: boolean) => void) {
      doActionWithError<CreateWithdrawRequest, CreateWithdrawResponse>(
        API.CREATE_WITHDRAW,
        req,
        req.Message,
        (resp: CreateWithdrawResponse): void => {
          this.Withdraws.Withdraws.splice(0, 0, resp.Info)
          done(false)
        },
        () => {
          done(true)
        }
      )
    }
  }
})

export * from './types'
