import {
  CreateEventCouponRequest,
  CreateEventCouponResponse,
  GetEventCouponsRequest,
  GetEventCouponsResponse
} from '../../admin'

interface CreateAppEventCouponRequest extends CreateEventCouponRequest {
  TargetAppID: string
}

interface CreateAppEventCouponResponse extends CreateEventCouponResponse {
}

interface GetAppEventCouponsRequest extends GetEventCouponsRequest {
  TargetAppID: string
}

interface GetAppEventCouponsResponse extends GetEventCouponsResponse {
}

export {
  CreateAppEventCouponRequest,
  CreateAppEventCouponResponse,
  GetAppEventCouponsRequest,
  GetAppEventCouponsResponse
}
