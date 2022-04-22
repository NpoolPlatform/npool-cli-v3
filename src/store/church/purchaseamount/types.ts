import {
  CreatePurchaseAmountSettingRequest,
  CreatePurchaseAmountSettingResponse,
  CreateUserPurchaseAmountSettingRequest,
  CreateUserPurchaseAmountSettingResponse,
  GetPurchaseAmountSettingsRequest,
  GetPurchaseAmountSettingsResponse
} from '../../admin'

interface CreateAppPurchaseAmountSettingRequest extends CreatePurchaseAmountSettingRequest {
  TargetAppID: string
}

interface CreateAppPurchaseAmountSettingResponse extends CreatePurchaseAmountSettingResponse {
}

interface CreateAppUserPurchaseAmountSettingRequest extends CreateUserPurchaseAmountSettingRequest {
  TargetAppID: string
}

interface CreateAppUserPurchaseAmountSettingResponse extends CreateUserPurchaseAmountSettingResponse {
}

interface GetAppPurchaseAmountSettingsRequest extends GetPurchaseAmountSettingsRequest {
  TargetAppID: string
}

interface GetAppPurchaseAmountSettingsResponse extends GetPurchaseAmountSettingsResponse {
}

export {
  CreateAppPurchaseAmountSettingRequest,
  CreateAppPurchaseAmountSettingResponse,
  GetAppPurchaseAmountSettingsRequest,
  GetAppPurchaseAmountSettingsResponse,
  CreateAppUserPurchaseAmountSettingRequest,
  CreateAppUserPurchaseAmountSettingResponse
}
