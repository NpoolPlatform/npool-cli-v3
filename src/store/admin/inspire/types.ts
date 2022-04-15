import { BaseRequest } from '../../base'

interface InvitationCode {
  ID?: string
  UserID: string
  InvitationCode?: string
}

interface GetInvitationCodesRequest extends BaseRequest {
}

interface GetInvitationCodesResponse {
  Infos: Array<InvitationCode>
}

interface CreateInvitationCodeRequest extends BaseRequest {
  TargetUserID: string
  Info: InvitationCode
}

interface CreateInvitationCodeResponse {
  Info: InvitationCode
}

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

interface PurchaseAmountSetting {
  ID: string
  UserID: string
  Amount: number
  Percent: number
  Title: string
  BadgeLarge: string
  BadgeSmall: string
  Start: number
  End: number
}

interface CreatePurchaseAmountSettingRequest extends BaseRequest {
  Info: PurchaseAmountSetting
}

interface CreatePurchaseAmountSettingResponse {
  Info: PurchaseAmountSetting
}

interface GetPurchaseAmountSettingsRequest extends BaseRequest {
}

interface GetPurchaseAmountSettingsResponse {
  Infos: Array<PurchaseAmountSetting>
}

interface CreatePurchaseAmountSettingRequest extends BaseRequest {
  TargetUserID: string
  Info: PurchaseAmountSetting
}

interface CreatePurchaseAmountSettingResponse {
  Info: PurchaseAmountSetting
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
  InvitationCode,
  CommissionSetting,
  PurchaseAmountSetting,
  CommissionCoinSetting,
  GetInvitationCodesRequest,
  GetInvitationCodesResponse,
  CreateInvitationCodeRequest,
  CreateInvitationCodeResponse,
  CreateCommissionSettingRequest,
  CreateCommissionSettingResponse,
  GetCommissionSettingRequest,
  GetCommissionSettingResponse,
  UpdateCommissionSettingRequest,
  UpdateCommissionSettingResponse,
  GetPurchaseAmountSettingsRequest,
  GetPurchaseAmountSettingsResponse,
  CreatePurchaseAmountSettingRequest,
  CreatePurchaseAmountSettingResponse,
  GetCommissionCoinSettingsRequest,
  GetCommissionCoinSettingsResponse
}
