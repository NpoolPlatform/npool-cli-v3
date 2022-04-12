import { ReqMessage } from '../../local/notifications/types'

interface Benefit {
  ID: string
  GoodID: string
  OrderID: string
  Amount: number
  CreateAt: number
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
