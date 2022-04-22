import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { FixAmountState } from './state'
import {
  CreateFixAmountRequest,
  CreateFixAmountResponse,
  GetFixAmountsRequest,
  GetFixAmountsResponse,
  UpdateFixAmountRequest,
  UpdateFixAmountResponse
} from './types'

export const useFixAmountStore = defineStore('fixamount', {
  state: (): FixAmountState => ({
    FixAmounts: []
  }),
  getters: {},
  actions: {
    getFixAmounts (req: GetFixAmountsRequest, done: (error: boolean) => void) {
      doActionWithError<GetFixAmountsRequest, GetFixAmountsResponse>(
        API.GET_FIX_AMOUNTS,
        req,
        req.Message,
        (resp: GetFixAmountsResponse): void => {
          this.FixAmounts = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    createFixAmount (req: CreateFixAmountRequest, done: () => void) {
      doAction<CreateFixAmountRequest, CreateFixAmountResponse>(
        API.CREATE_FIX_AMOUNT,
        req,
        req.Message,
        (resp: CreateFixAmountResponse): void => {
          this.FixAmounts.push(resp.Info)
          done()
        })
    },
    updateFixAmount (req: UpdateFixAmountRequest, done: () => void) {
      doAction<UpdateFixAmountRequest, UpdateFixAmountResponse>(
        API.UPDATE_FIX_AMOUNT,
        req,
        req.Message,
        (resp: UpdateFixAmountResponse): void => {
          const index = this.FixAmounts.findIndex((el) => el.ID === resp.Info.ID)
          this.FixAmounts.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    }
  }
})

export * from './types'
