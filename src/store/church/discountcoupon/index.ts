import { defineStore } from 'pinia'
import {
  DiscountCoupon,
  UpdateDiscountRequest,
  UpdateDiscountResponse
} from '../../admin'
import { API as DiscountAPI } from '../../admin/discountcoupon/const'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { DiscountState } from './state'
import {
  CreateAppDiscountRequest,
  CreateAppDiscountResponse,
  GetAppDiscountsRequest,
  GetAppDiscountsResponse
} from './types'

export const useChurchDiscountStore = defineStore('churchdiscountcoupon', {
  state: (): DiscountState => ({
    Discounts: new Map<string, Array<DiscountCoupon>>()
  }),
  getters: {},
  actions: {
    getDiscounts (req: GetAppDiscountsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppDiscountsRequest, GetAppDiscountsResponse>(
        API.GET_DISCOUNT_POOLS,
        req,
        req.Message,
        (resp: GetAppDiscountsResponse): void => {
          this.Discounts.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    createDiscount (req: CreateAppDiscountRequest, done: () => void) {
      doAction<CreateAppDiscountRequest, CreateAppDiscountResponse>(
        API.CREATE_DISCOUNT,
        req,
        req.Message,
        (resp: CreateAppDiscountResponse): void => {
          let amounts = this.Discounts.get(req.TargetAppID)
          if (!amounts) {
            amounts = []
          }
          amounts.push(resp.Info)
          this.Discounts.set(req.TargetAppID, amounts)
          done()
        })
    },
    updateDiscount (req: UpdateDiscountRequest, done: () => void) {
      doAction<UpdateDiscountRequest, UpdateDiscountResponse>(
        DiscountAPI.UPDATE_DISCOUNT,
        req,
        req.Message,
        (resp: UpdateDiscountResponse): void => {
          for (const [k, v] of this.Discounts) {
            const index = v.findIndex((el) => el.ID === resp.Info.ID)
            if (index < 0) {
              continue
            }
            v.splice(index, 1, resp.Info)
            this.Discounts.set(k, v)
          }
          done()
        })
    }
  }
})

export * from './types'
