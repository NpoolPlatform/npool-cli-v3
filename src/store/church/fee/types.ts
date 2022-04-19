import { FeeType, Fee } from '../../frontend'
import { BaseRequest } from '../../base'

interface CreateFeeTypeRequest extends BaseRequest {
  Info: FeeType
}

interface CreateFeeTypeResponse {
  Info: FeeType
}

interface UpdateFeeTypeRequest extends BaseRequest {
  Info: FeeType
}

interface UpdateFeeTypeResponse {
  Info: FeeType
}

interface GetFeesRequest extends BaseRequest {
}

interface GetFeesResponse {
  Infos: Array<Fee>
}

interface CreateFeeRequest extends BaseRequest {
  Info: Fee
}

interface CreateFeeResponse {
  Info: Fee
}

interface FeeState {
  Fees: Array<Fee>
}

export {
  CreateFeeTypeRequest,
  CreateFeeTypeResponse,
  UpdateFeeTypeRequest,
  UpdateFeeTypeResponse,
  GetFeesRequest,
  GetFeesResponse,
  CreateFeeRequest,
  CreateFeeResponse,
  FeeState
}
