import {
  Coin,
  Description,
  GetDescriptionsRequest,
  GetDescriptionsResponse
} from '../../frontend'
import { BaseRequest } from '../../base'

interface CreateCoinRequest extends BaseRequest, Coin {
}

interface CreateCoinResponse {
  Info: Coin
}

interface UpdateCoinRequest extends BaseRequest, Coin {
}

interface UpdateCoinResponse {
  Info: Coin
}

interface CreateAppDescriptionRequest extends BaseRequest {
  TargetAppID: string
  Info: Description
}

interface CreateAppDescriptionResponse {
  Info: Description
}

interface UpdateAppDescriptionRequest extends BaseRequest {
  Info: Description
}

interface UpdateAppDescriptionResponse {
  Info: Description
}

interface GetAppDescriptionsRequest extends GetDescriptionsRequest {
  TargetAppID: string
}

interface GetAppDescriptionsResponse extends GetDescriptionsResponse {
}

export {
  CreateCoinRequest,
  CreateCoinResponse,
  UpdateCoinRequest,
  UpdateCoinResponse,
  CreateAppDescriptionRequest,
  CreateAppDescriptionResponse,
  UpdateAppDescriptionRequest,
  UpdateAppDescriptionResponse,
  GetAppDescriptionsRequest,
  GetAppDescriptionsResponse
}
