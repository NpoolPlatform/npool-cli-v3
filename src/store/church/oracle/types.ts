import { Reward } from '../../frontend'
import { BaseRequest } from '../../base'

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

export {
  CreateRewardRequest,
  CreateRewardResponse,
  UpdateRewardRequest,
  UpdateRewardResponse
}
