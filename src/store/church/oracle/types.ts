import { Reward } from '../../frontend'
import { BaseRequest } from '../../base'
import {
  CreateCurrencyRequest,
  CreateCurrencyResponse,
  GetCurrenciesRequest,
  GetCurrenciesResponse
} from '../../admin'

interface CreateRewardRequest extends BaseRequest {
  Info: Reward
}

interface CreateRewardResponse {
  Info: Reward
}

interface UpdateRewardRequest extends BaseRequest {
  Info: Reward
}

interface UpdateRewardResponse {
  Info: Reward
}

interface CreateAppCurrencyRequest extends CreateCurrencyRequest {
  TargetAppID: string
}

interface CreateAppCurrencyResponse extends CreateCurrencyResponse {
}

interface GetAppCurrenciesRequest extends GetCurrenciesRequest {
  TargetAppID: string
}

interface GetAppCurrenciesResponse extends GetCurrenciesResponse {
}

export {
  CreateRewardRequest,
  CreateRewardResponse,
  UpdateRewardRequest,
  UpdateRewardResponse,
  CreateAppCurrencyRequest,
  CreateAppCurrencyResponse,
  GetAppCurrenciesRequest,
  GetAppCurrenciesResponse
}
