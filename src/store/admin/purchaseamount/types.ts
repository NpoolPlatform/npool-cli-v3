import { BaseRequest } from '../../base'

interface PurchaseAmountSetting {
  ID: string
  AppID: string
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

interface CreateUserPurchaseAmountSettingRequest extends BaseRequest {
  TargetUserID: string
  Info: PurchaseAmountSetting
}

interface CreateUserPurchaseAmountSettingResponse {
  Info: PurchaseAmountSetting
}

export {
  PurchaseAmountSetting,
  GetPurchaseAmountSettingsRequest,
  GetPurchaseAmountSettingsResponse,
  CreatePurchaseAmountSettingRequest,
  CreatePurchaseAmountSettingResponse,
  CreateUserPurchaseAmountSettingRequest,
  CreateUserPurchaseAmountSettingResponse
}
