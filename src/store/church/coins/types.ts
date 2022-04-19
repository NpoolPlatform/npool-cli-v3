import { Coin, Description } from '../../frontend'
import { BaseRequest } from '../../base'
import { ReqMessage } from '../../local'

interface CreateCoinRequest extends BaseRequest, Coin {
  Info: Coin
}

interface CreateCoinResponse {
  Info: Coin
}

interface UpdateCoinRequest extends BaseRequest, Coin {
  ID: string
  PreSale: boolean
  Logo: string
  ReservedAmount: number
  ForPay: boolean
}

interface UpdateCoinResponse {
  Info: Coin
}

interface CreateDescriptionRequest extends Description {
  NotifyMessage: ReqMessage
}

interface CreateDescriptionResponse {
  Info: Description
}

interface UpdateDescriptionRequest extends Description {
  NotifyMessage: ReqMessage
}

interface UpdateDescriptionResponse {
  Info: Description
}

export {
  CreateCoinRequest,
  CreateCoinResponse,
  UpdateCoinRequest,
  UpdateCoinResponse,
  Description,
  CreateDescriptionRequest,
  CreateDescriptionResponse,
  UpdateDescriptionRequest,
  UpdateDescriptionResponse
}
