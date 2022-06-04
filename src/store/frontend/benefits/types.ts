import { BaseRequest } from '../../base'

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

interface GetBenefitsRequest extends BaseRequest {
}

interface GetBenefitsResponse {
  Infos: Array<Benefit>
}

interface Commission {
  Total: number
  Balance: number
}

interface GetCommissionRequest extends BaseRequest {
}

interface GetCommissionResponse {
  Info: Commission
}

interface CommissionCoinSetting {
  ID?: string
  CoinTypeID: string
  Using: boolean
}

interface GetCommissionCoinSettingsRequest extends BaseRequest {
}

interface GetCommissionCoinSettingsResponse {
  Infos: Array<CommissionCoinSetting>
}

interface BenefitState {
  Benefits: Array<Benefit>
  Commission: Commission
  CommissionCoinSettings: Array<CommissionCoinSetting>
}

export {
  Benefit,
  BenefitState,
  GetBenefitsRequest,
  GetBenefitsResponse,
  Commission,
  GetCommissionRequest,
  GetCommissionResponse,
  CommissionCoinSetting,
  GetCommissionCoinSettingsRequest,
  GetCommissionCoinSettingsResponse
}
