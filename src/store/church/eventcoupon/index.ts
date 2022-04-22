import { defineStore } from 'pinia'
import { EventCoupon } from '../../admin'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { EventCouponState } from './state'
import {
  CreateAppEventCouponRequest,
  CreateAppEventCouponResponse,
  GetAppEventCouponsRequest,
  GetAppEventCouponsResponse
} from './types'

export const useChurchEventCouponStore = defineStore('churcheventcoupon', {
  state: (): EventCouponState => ({
    EventCoupons: new Map<string, Array<EventCoupon>>()
  }),
  getters: {},
  actions: {
    getEventCoupons (req: GetAppEventCouponsRequest, done: (error: boolean) => void) {
      doActionWithError<GetAppEventCouponsRequest, GetAppEventCouponsResponse>(
        API.GET_EVENT_COUPONS,
        req,
        req.Message,
        (resp: GetAppEventCouponsResponse): void => {
          this.EventCoupons.set(req.TargetAppID, resp.Infos)
          done(false)
        }, () => {
          done(true)
        })
    },
    createEventCoupon (req: CreateAppEventCouponRequest, done: () => void) {
      doAction<CreateAppEventCouponRequest, CreateAppEventCouponResponse>(
        API.CREATE_EVENT_COUPON,
        req,
        req.Message,
        (resp: CreateAppEventCouponResponse): void => {
          let coupons = this.EventCoupons.get(req.TargetAppID)
          if (!coupons) {
            coupons = []
          }
          coupons.push(resp.Info)
          this.EventCoupons.set(req.TargetAppID, coupons)
          done()
        })
    }
  }
})

export * from './types'
