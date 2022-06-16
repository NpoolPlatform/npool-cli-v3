import { PurchaseAmountSetting } from '../../frontend'
import { BaseRequest } from '../../base'

interface CreatePurchaseAmountSettingRequest extends BaseRequest {
  Info: PurchaseAmountSetting
}

interface CreatePurchaseAmountSettingResponse {
  Info: PurchaseAmountSetting
}

interface GetAppPurchaseAmountSettingsRequest extends BaseRequest {
}

interface GetAppPurchaseAmountSettingsResponse {
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
  GetAppPurchaseAmountSettingsRequest,
  GetAppPurchaseAmountSettingsResponse,
  CreatePurchaseAmountSettingRequest,
  CreatePurchaseAmountSettingResponse,
  CreateUserPurchaseAmountSettingRequest,
  CreateUserPurchaseAmountSettingResponse
}
