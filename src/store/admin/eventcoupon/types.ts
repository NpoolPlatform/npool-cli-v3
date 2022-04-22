import { BaseRequest } from '../../base'

interface EventCoupon {
  ID?: string
  AppID?: string
  ActivityID: string
  Event: string
  CouponID: string
  Type: string
  Count: number
}

interface CreateEventCouponRequest extends BaseRequest {
  Info: EventCoupon
}

interface CreateEventCouponResponse {
  Info: EventCoupon
}

interface UpdateEventCouponRequest extends BaseRequest {
  Info: EventCoupon
}

interface UpdateEventCouponResponse {
  Info: EventCoupon
}

interface GetEventCouponsRequest extends BaseRequest {
}

interface GetEventCouponsResponse {
  Infos: Array<EventCoupon>
}

export {
  EventCoupon,
  CreateEventCouponRequest,
  CreateEventCouponResponse,
  GetEventCouponsRequest,
  GetEventCouponsResponse,
  UpdateEventCouponRequest,
  UpdateEventCouponResponse
}
