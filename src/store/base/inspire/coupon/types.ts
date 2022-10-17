export interface Allocated {
  ID: string
  AppID: string
  UserID: string
  Type: string
  CouponID: string
}
export interface Coupon {
  ID: string
  AppID: string
  ReleaseByUserID: string
  Denomination: number
  Circulation: string
  Start: number
  DurationDays: number
  Message: string
  Name: string
}

export interface Discount {
  ID: string
  AppID: string
  ReleaseByUserID: string
  Discount: number
  Start: number
  DurationDays: number
  Message: string
  Name: string
}

export interface UserCoupon {
  Allocated: Allocated
  Coupon: Coupon
  Discount: Discount
}

export interface SpecialOffer {
  ID: string
  AppID: string
  UserID: string
  Amount: number
  ReleaseByUserID: string
  Start: number
  DurationDays: number
  Message: string
}