import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { EventCouponState } from './state'
import {
  CreateEventCouponRequest,
  CreateEventCouponResponse,
  GetEventCouponsRequest,
  GetEventCouponsResponse,
  UpdateEventCouponRequest,
  UpdateEventCouponResponse
} from './types'

export const useEventCouponStore = defineStore('eventcoupon', {
  state: (): EventCouponState => ({
    EventCoupons: []
  }),
  getters: {},
  actions: {
    getEventCoupons (req: GetEventCouponsRequest, done: (error: boolean) => void) {
      doActionWithError<GetEventCouponsRequest, GetEventCouponsResponse>(
        API.GET_EVENT_COUPONS,
        req,
        req.Message,
        (resp: GetEventCouponsResponse): void => {
          this.EventCoupons = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    createEventCoupon (req: CreateEventCouponRequest, done: () => void) {
      doAction<CreateEventCouponRequest, CreateEventCouponResponse>(
        API.CREATE_EVENT_COUPON,
        req,
        req.Message,
        (resp: CreateEventCouponResponse): void => {
          this.EventCoupons.push(resp.Info)
          done()
        })
    },
    updateEventCoupon (req: UpdateEventCouponRequest, done: () => void) {
      doAction<UpdateEventCouponRequest, UpdateEventCouponResponse>(
        API.UPDATE_EVENT_COUPON,
        req,
        req.Message,
        (resp: UpdateEventCouponResponse): void => {
          const index = this.EventCoupons.findIndex((el) => el.ID === resp.Info.ID)
          this.EventCoupons.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done()
        })
    }
  }
})

export * from './types'
export { CouponEvents, CouponEvent, EventCouponTypes } from './const'
