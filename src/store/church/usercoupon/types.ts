import { CreateUserCouponRequest, CreateUserCouponResponse, GetUserCouponsRequest, GetUserCouponsResponse } from '../../admin'

interface CreateAppUserCouponRequest extends CreateUserCouponRequest {
  TargetAppID: string
}

interface CreateAppUserCouponResponse extends CreateUserCouponResponse {
}

interface GetAppUserCouponsRequest extends GetUserCouponsRequest {
  TargetAppID: string
}

interface GetAppUserCouponsResponse extends GetUserCouponsResponse {
}

export {
  CreateAppUserCouponRequest,
  CreateAppUserCouponResponse,
  GetAppUserCouponsRequest,
  GetAppUserCouponsResponse
}
