import {
  CreateDiscountRequest,
  CreateDiscountResponse,
  GetDiscountsRequest,
  GetDiscountsResponse
} from '../../admin'

interface CreateAppDiscountRequest extends CreateDiscountRequest {
  TargetAppID: string
}

interface CreateAppDiscountResponse extends CreateDiscountResponse {
}

interface GetAppDiscountsRequest extends GetDiscountsRequest {
  TargetAppID: string
}

interface GetAppDiscountsResponse extends GetDiscountsResponse {
}

export {
  CreateAppDiscountRequest,
  CreateAppDiscountResponse,
  GetAppDiscountsRequest,
  GetAppDiscountsResponse
}
