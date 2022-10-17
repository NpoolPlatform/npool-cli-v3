import { BaseRequest, SpecialOffer, UserCoupon } from '../../../base'

export interface GetCouponsRequest extends BaseRequest {
}

export interface GetCouponsResponse {
  Infos: Array<UserCoupon>
  Total: number
}

export interface GetSpecialOffersRequest extends BaseRequest{
}

export interface GetSpecialOffersResponse {
  Infos: Array<SpecialOffer>
  Total: number
}