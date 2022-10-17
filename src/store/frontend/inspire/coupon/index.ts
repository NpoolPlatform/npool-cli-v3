import { defineStore } from 'pinia'
import { doActionWithError } from '../../../action'
import { SpecialOffer, UserCoupon } from '../../../base'
import { API } from './const'
import {
  GetCouponsRequest,
  GetCouponsResponse,
  GetSpecialOffersRequest,
  GetSpecialOffersResponse
} from './types'

export const useCouponStore = defineStore('coupon', {
  state: () => ({
    UserCoupons: {
      UserCoupons: [] as Array<UserCoupon>,
      Total: 0
    },
    SpecialOffers: {
      SpecialOffers: [] as Array<SpecialOffer>,
      Total: 0
    }
  }),
  getters: {
    expired () {
      return () => {
        // TODO
      }
    },
    discounts () {
      return () => {
        return this.UserCoupons.UserCoupons.filter((el) => el.Discount).map((el) => el.Discount)
      }
    },
    coupons () {
      return () => {
        return this.UserCoupons.UserCoupons.filter((el) => el.Coupon).map((el) => el.Coupon)
      }
    }
  },
  actions: {
    getCoupons (req: GetCouponsRequest, done: (userCoupons: Array<UserCoupon>, error: boolean) => void) {
      doActionWithError<GetCouponsRequest, GetCouponsResponse>(
        API.GET_COUPONS,
        req,
        req.Message,
        (resp: GetCouponsResponse): void => {
          this.UserCoupons.UserCoupons.push(...resp.Infos)
          this.UserCoupons.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },

    getSpecialOffers (req: GetSpecialOffersRequest, done: (specialOffers: Array<SpecialOffer>, error: boolean) => void) {
      doActionWithError<GetSpecialOffersRequest, GetSpecialOffersResponse>(
        API.GET_SPECIAL_OFFERS,
        req,
        req.Message,
        (resp: GetSpecialOffersResponse): void => {
          this.SpecialOffers.SpecialOffers.push(...resp.Infos)
          this.SpecialOffers.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    }
  }
})
