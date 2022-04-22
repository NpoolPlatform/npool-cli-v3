import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { DiscountState } from './state'
import {
  CreateDiscountRequest,
  CreateDiscountResponse,
  GetDiscountsRequest,
  GetDiscountsResponse,
  UpdateDiscountRequest,
  UpdateDiscountResponse
} from './types'

export const useDiscountStore = defineStore('discount', {
  state: (): DiscountState => ({
    Discounts: []
  }),
  getters: {},
  actions: {
    getDiscounts (req: GetDiscountsRequest, done: (error: boolean) => void) {
      doActionWithError<GetDiscountsRequest, GetDiscountsResponse>(
        API.GET_DISCOUNT_POOLS,
        req,
        req.Message,
        (resp: GetDiscountsResponse): void => {
          this.Discounts = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    createDiscount (req: CreateDiscountRequest, done: () => void) {
      doAction<CreateDiscountRequest, CreateDiscountResponse>(
        API.CREATE_DISCOUNT,
        req,
        req.Message,
        (resp: CreateDiscountResponse): void => {
          this.Discounts.push(resp.Info)
          done()
        })
    },
    updateDiscount (req: UpdateDiscountRequest, done: () => void) {
      doAction<UpdateDiscountRequest, UpdateDiscountResponse>(
        API.UPDATE_DISCOUNT,
        req,
        req.Message,
        (resp: UpdateDiscountResponse): void => {
          const index = this.Discounts.findIndex((el) => el.ID === resp.Info.ID)
          this.Discounts.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    }
  }
})

export * from './types'
