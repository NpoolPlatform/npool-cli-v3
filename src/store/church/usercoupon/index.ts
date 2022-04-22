import { defineStore } from 'pinia'
import { UserCoupon } from '../../frontend'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { UserCouponState } from './state'
import {
  CreateAppUserCouponRequest,
  CreateAppUserCouponResponse,
  GetAppUserCouponsRequest,
  GetAppUserCouponsResponse
} from './types'

export const useChurchUserCouponStore = defineStore('churchusercoupon', {
  state: (): UserCouponState => ({
    UserCoupons: new Map<string, Array<UserCoupon>>()
  }),
  getters: {},
  actions: {
    createUserCoupon (req: CreateAppUserCouponRequest, done: () => void) {
      doAction<CreateAppUserCouponRequest, CreateAppUserCouponResponse>(
        API.CREATE_USER_COUPON,
        req,
        req.Message,
        (resp: CreateAppUserCouponResponse): void => {
          let coupons = this.UserCoupons.get(req.TargetAppID)
          if (!coupons) {
            coupons = []
          }
          coupons.push(resp.Info)
          this.UserCoupons.set(req.TargetAppID, coupons)
          done()
        })
    },
    getUserCoupons (req: GetAppUserCouponsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppUserCouponsRequest, GetAppUserCouponsResponse>(
        API.GET_USER_COUPONS,
        req,
        req.Message,
        (resp: GetAppUserCouponsResponse): void => {
          this.UserCoupons.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
