import { defineStore } from 'pinia'
import {
  FixAmountCoupon,
  UpdateFixAmountRequest,
  UpdateFixAmountResponse
} from '../../admin'
import { API as FixAmountAPI } from '../../admin/fixamount/const'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { FixAmountState } from './state'
import {
  CreateAppFixAmountRequest,
  CreateAppFixAmountResponse,
  GetAppFixAmountsRequest,
  GetAppFixAmountsResponse
} from './types'

export const useChurchFixAmountStore = defineStore('churchfixamount', {
  state: (): FixAmountState => ({
    FixAmounts: new Map<string, Array<FixAmountCoupon>>()
  }),
  getters: {
    getFixAmountByAppID (): (appID: string, id: string) => FixAmountCoupon {
      return (appID: string, id: string) => {
        const coupons = this.FixAmounts.get(appID)
        if (!coupons) {
          return undefined as unknown as FixAmountCoupon
        }
        const index = coupons.findIndex((el) => el.ID === id)
        return index < 0 ? undefined as unknown as FixAmountCoupon : coupons[index]
      }
    }
  },
  actions: {
    getFixAmounts (req: GetAppFixAmountsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppFixAmountsRequest, GetAppFixAmountsResponse>(
        API.GET_FIX_AMOUNTS,
        req,
        req.Message,
        (resp: GetAppFixAmountsResponse): void => {
          this.FixAmounts.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    createFixAmount (req: CreateAppFixAmountRequest, done: () => void) {
      doAction<CreateAppFixAmountRequest, CreateAppFixAmountResponse>(
        API.CREATE_FIX_AMOUNT,
        req,
        req.Message,
        (resp: CreateAppFixAmountResponse): void => {
          let amounts = this.FixAmounts.get(req.TargetAppID)
          if (!amounts) {
            amounts = []
          }
          amounts.push(resp.Info)
          this.FixAmounts.set(req.TargetAppID, amounts)
          done()
        })
    },
    updateFixAmount (req: UpdateFixAmountRequest, done: () => void) {
      doAction<UpdateFixAmountRequest, UpdateFixAmountResponse>(
        FixAmountAPI.UPDATE_FIX_AMOUNT,
        req,
        req.Message,
        (resp: UpdateFixAmountResponse): void => {
          for (const [k, v] of this.FixAmounts) {
            const index = v.findIndex((el) => el.ID === resp.Info.ID)
            if (index < 0) {
              continue
            }
            v.splice(index, 1, resp.Info)
            this.FixAmounts.set(k, v)
          }
          done()
        })
    }
  }
})

export * from './types'
