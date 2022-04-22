import { Discount } from '../../frontend'
import { BaseRequest } from '../../base'

interface DiscountCoupon extends Discount {
  ReleaseByUserID: string
}

interface CreateDiscountRequest extends BaseRequest {
  Info: DiscountCoupon
}

interface CreateDiscountResponse {
  Info: DiscountCoupon
}

interface UpdateDiscountRequest extends BaseRequest {
  Info: DiscountCoupon
}

interface UpdateDiscountResponse {
  Info: DiscountCoupon
}

interface GetDiscountsRequest extends BaseRequest {
}

interface GetDiscountsResponse {
  Infos: Array<DiscountCoupon>
}

export {
  DiscountCoupon,
  CreateDiscountRequest,
  CreateDiscountResponse,
  UpdateDiscountRequest,
  UpdateDiscountResponse,
  GetDiscountsRequest,
  GetDiscountsResponse
}
