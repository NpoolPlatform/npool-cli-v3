import { FixAmount } from '../../frontend'
import { BaseRequest } from '../../base'

interface FixAmountCoupon extends FixAmount {
  ReleaseByUserID: string
  Denomination: number
  Circulation: number
}

interface CreateFixAmountRequest extends BaseRequest {
  Info: FixAmountCoupon
}

interface CreateFixAmountResponse {
  Info: FixAmountCoupon
}

interface GetFixAmountsRequest extends BaseRequest {
}

interface GetFixAmountsResponse {
  Infos: Array<FixAmountCoupon>
}

interface UpdateFixAmountRequest extends BaseRequest {
  Info: FixAmountCoupon
}

interface UpdateFixAmountResponse {
  Info: FixAmountCoupon
}

export {
  FixAmountCoupon,
  CreateFixAmountRequest,
  CreateFixAmountResponse,
  GetFixAmountsRequest,
  GetFixAmountsResponse,
  UpdateFixAmountRequest,
  UpdateFixAmountResponse
}
