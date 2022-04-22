import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { UserCouponState } from './state'
import {
  CreateUserCouponRequest,
  CreateUserCouponResponse,
  GetUserCouponsRequest,
  GetUserCouponsResponse
} from './types'

export const useUserCouponStore = defineStore('usercoupon', {
  state: (): UserCouponState => ({
    UserCoupons: []
  }),
  getters: {},
  actions: {
    createUserCoupon (req: CreateUserCouponRequest, done: () => void) {
      doAction<CreateUserCouponRequest, CreateUserCouponResponse>(
        API.CREATE_USER_COUPON,
        req,
        req.Message,
        (resp: CreateUserCouponResponse): void => {
          this.UserCoupons.push(resp.Info)
          done()
        })
    },
    getUserCoupons (req: GetUserCouponsRequest, done: (error: boolean) => void) {
      doActionWithError<GetUserCouponsRequest, GetUserCouponsResponse>(
        API.GET_USER_COUPONS,
        req,
        req.Message,
        (resp: GetUserCouponsResponse): void => {
          this.UserCoupons = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    }
  }
})

export * from './types'
