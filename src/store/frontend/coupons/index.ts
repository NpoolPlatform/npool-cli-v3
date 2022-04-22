import { defineStore } from 'pinia'
import { doAction } from '../../action'
import { API } from './const'
import {
  CouponState,
  Discount,
  FixAmount,
  GetCouponsRequest,
  GetCouponsResponse,
  GetSpecialOffersRequest,
  GetSpecialOffersResponse
} from './types'

export const useCouponStore = defineStore('coupon', {
  state: (): CouponState => ({
    Allocateds: [],
    FixAmounts: new Map<string, FixAmount>(),
    Discounts: new Map<string, Discount>(),
    SpecialOffers: []
  }),
  getters: {
    getFixAmountByID (): (id: string) => FixAmount {
      return (id: string): FixAmount => {
        return this.FixAmounts.get(id) as FixAmount
      }
    },
    getDiscountByID (): (id: string) => Discount {
      return (id: string): Discount => {
        return this.Discounts.get(id) as Discount
      }
    }
  },
  actions: {
    getCoupons (req: GetCouponsRequest) {
      doAction<GetCouponsRequest, GetCouponsResponse>(
        API.GET_COUPONS,
        req,
        req.Message,
        (resp: GetCouponsResponse): void => {
          this.Allocateds = []
          this.FixAmounts = new Map<string, FixAmount>()
          this.Discounts = new Map<string, Discount>()
          resp.Infos.forEach((info) => {
            this.Allocateds.push(info.Allocated)
            if (info.Coupon) {
              this.FixAmounts.set(info.Coupon.ID as string, info.Coupon)
            }
            if (info.Discount) {
              this.Discounts.set(info.Discount.ID as string, info.Discount)
            }
          })
        })
    },

    getSpecialOffers (req: GetSpecialOffersRequest) {
      doAction<GetSpecialOffersRequest, GetSpecialOffersResponse>(
        API.GET_SPECIAL_OFFERS,
        req,
        req.Message,
        (resp: GetSpecialOffersResponse): void => {
          this.SpecialOffers = resp.Infos
        })
    }
  }
})

export { Type as CouponType } from './const'
export * from './types'
