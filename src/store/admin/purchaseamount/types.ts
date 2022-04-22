import { BaseRequest } from '../../base'

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

export {
  PurchaseAmountSetting,
  GetPurchaseAmountSettingsRequest,
  GetPurchaseAmountSettingsResponse,
  CreatePurchaseAmountSettingRequest,
  CreatePurchaseAmountSettingResponse
}
