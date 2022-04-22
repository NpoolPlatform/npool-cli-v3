import { defineStore } from 'pinia'
import { EventCoupon, UpdateEventCouponRequest, UpdateEventCouponResponse } from '../../admin'
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
    },
    updateEventCoupon (req: UpdateEventCouponRequest, done: () => void) {
      doAction<UpdateEventCouponRequest, UpdateEventCouponResponse>(
        API.CREATE_EVENT_COUPON,
        req,
        req.Message,
        (resp: CreateAppEventCouponResponse): void => {
          const coupons = this.EventCoupons.get(req.Info.AppID as string) as Array<EventCoupon>
          const index = coupons.findIndex((el) => el.ID === resp.Info.ID)
          if (index < 0) {
            return
          }
          coupons.splice(index, 1, resp.Info)
          this.EventCoupons.set(req.Info.AppID as string, coupons)
          done()
        })
    }
  }
})

export * from './types'
