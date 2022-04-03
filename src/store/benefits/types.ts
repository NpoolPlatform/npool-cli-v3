import { ReqMessage } from '../notifications/types'
import { State } from '../state'

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

interface BenefitState extends State {
  Benefits: Array<Benefit>
}

export {
  Benefit,
  BenefitState,
  GetBenefitsRequest,
  GetBenefitsResponse
}
