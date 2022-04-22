import {
  CreateFixAmountRequest,
  CreateFixAmountResponse,
  GetFixAmountsRequest,
  GetFixAmountsResponse
} from '../../admin'

interface CreateAppFixAmountRequest extends CreateFixAmountRequest {
  TargetAppID: string
}

interface CreateAppFixAmountResponse extends CreateFixAmountResponse {
}

interface GetAppFixAmountsRequest extends GetFixAmountsRequest {
  TargetAppID: string
}

interface GetAppFixAmountsResponse extends GetFixAmountsResponse {
}

export {
  CreateAppFixAmountRequest,
  CreateAppFixAmountResponse,
  GetAppFixAmountsRequest,
  GetAppFixAmountsResponse
}
