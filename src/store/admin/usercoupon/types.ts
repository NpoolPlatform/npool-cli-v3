import { UserCoupon } from '../../frontend'
import { BaseRequest } from '../../base'

interface TargetUserCoupon extends UserCoupon {
  UserID?: string
}

interface CreateUserCouponRequest extends BaseRequest {
  Info: TargetUserCoupon
}

interface CreateUserCouponResponse {
  Info: TargetUserCoupon
}

interface GetUserCouponsRequest extends BaseRequest {
}

interface GetUserCouponsResponse {
  Infos: Array<TargetUserCoupon>
}

export {
  TargetUserCoupon,
  CreateUserCouponRequest,
  CreateUserCouponResponse,
  GetUserCouponsRequest,
  GetUserCouponsResponse
}
