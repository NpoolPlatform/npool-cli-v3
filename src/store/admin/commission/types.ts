import { BaseRequest } from '../../base'

interface CommissionSetting {
  ID: string
  Type: string
  Level: number
  InvitationDiscount: boolean
  UniqueSetting: boolean
  KPISetting: boolean
}

interface CreateCommissionSettingRequest extends BaseRequest {
  Info: CommissionSetting
}

interface CreateCommissionSettingResponse {
  Info: CommissionSetting
}

interface GetCommissionSettingRequest extends BaseRequest {
}

interface GetCommissionSettingResponse {
  Info: CommissionSetting
}

interface UpdateCommissionSettingRequest extends BaseRequest {
  Info: CommissionSetting
}

interface UpdateCommissionSettingResponse {
  Info: CommissionSetting
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

export {
  CommissionSetting,
  CommissionCoinSetting,
  CreateCommissionSettingRequest,
  CreateCommissionSettingResponse,
  GetCommissionSettingRequest,
  GetCommissionSettingResponse,
  UpdateCommissionSettingRequest,
  UpdateCommissionSettingResponse,
  GetCommissionCoinSettingsRequest,
  GetCommissionCoinSettingsResponse
}
