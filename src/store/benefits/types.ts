import { ReqMessage } from '../notifications/types'

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

interface BenefitState {
  Benefits: Array<Benefit>
}

export {
  Benefit,
  BenefitState,
  GetBenefitsRequest,
  GetBenefitsResponse
}
