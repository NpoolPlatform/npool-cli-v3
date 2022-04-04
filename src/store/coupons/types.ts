import { ReqMessage } from '../notifications/types'

interface UserCoupon {
  ID: string
  Type: string
  CouponID: string
}

interface FixAmount {
  ID: string
  Start: number
  DurationDays: number
  Denomination: number
  Message: string
  Name: string
}

interface Discount {
  ID: string
  Start: number
  DurationDays: number
  Discount: number
  Message: string
  Name: string
}

interface Allocated {
  Allocated: UserCoupon
  Coupon: FixAmount
  Discount: Discount
}

interface SpecialOffer {
  ID: string
  Amount: string
  Start: number
  DurationDays: number
  Message: string
}

interface GetCouponsRequest {
  Message: ReqMessage
}

interface GetCouponsResponse {
  Infos: Array<Allocated>
}

interface GetSpecialOffersRequest {
  Message: ReqMessage
}

interface GetSpecialOffersResponse {
  Infos: Array<SpecialOffer>
}

interface CouponState {
  Allocateds: Array<UserCoupon>
  FixAmounts: Map<string, FixAmount>
  Discounts: Map<string, Discount>
  SpecialOffers: Array<SpecialOffer>
}

export {
  UserCoupon,
  FixAmount,
  Discount,
  Allocated,
  GetCouponsRequest,
  GetCouponsResponse,
  SpecialOffer,
  GetSpecialOffersRequest,
  GetSpecialOffersResponse,
  CouponState
}
