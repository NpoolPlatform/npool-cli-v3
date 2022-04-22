import { UserCoupon } from '../../frontend'
import { BaseRequest } from '../../base'

interface CreateUserCouponRequest extends BaseRequest {
  TargetUserID: string
  Info: UserCoupon
}

interface CreateUserCouponResponse {
  Info: UserCoupon
}

interface GetUserCouponsRequest extends BaseRequest {
}

interface GetUserCouponsResponse {
  Infos: Array<UserCoupon>
}

export {
  CreateUserCouponRequest,
  CreateUserCouponResponse,
  GetUserCouponsRequest,
  GetUserCouponsResponse
}
