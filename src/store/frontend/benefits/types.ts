import { ReqMessage } from '../../local/notifications/types'

interface Benefit {
  ID: string
  AppID: string
  UserID: string
  GoodID: string
  OrderID: string
  CoinTypeID: string
  Amount: number
  CreateAt: number
  LastBenefitTimestamp: number
}

interface GetBenefitsRequest {
  Message: ReqMessage
}

interface GetBenefitsResponse {
  Infos: Array<Benefit>
}

interface Commission {
  Total: number
  Balance: number
}

interface GetCommissionRequest {
  Message: ReqMessage
}

interface GetCommissionResponse {
  Info: Commission
}

interface BenefitState {
  Benefits: Array<Benefit>
  Commission: Commission
}

export {
  Benefit,
  BenefitState,
  GetBenefitsRequest,
  GetBenefitsResponse,
  Commission,
  GetCommissionRequest,
  GetCommissionResponse
}
