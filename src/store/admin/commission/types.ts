import { BaseRequest } from '../../base'

interface CommissionSetting {
  ID?: string
  AppID: string
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

export {
  CommissionSetting,
  CreateCommissionSettingRequest,
  CreateCommissionSettingResponse,
  GetCommissionSettingRequest,
  GetCommissionSettingResponse,
  UpdateCommissionSettingRequest,
  UpdateCommissionSettingResponse
}
