import { BaseRequest } from '../../base'
import {
  CreatePurchaseAmountSettingRequest,
  CreatePurchaseAmountSettingResponse,
  CreateUserPurchaseAmountSettingRequest,
  CreateUserPurchaseAmountSettingResponse,
  GetPurchaseAmountSettingsRequest,
  GetPurchaseAmountSettingsResponse,
  PurchaseAmountSetting
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

interface UpdateAppPurchaseAmountSettingRequest extends BaseRequest {
  Info: PurchaseAmountSetting
}

interface UpdateAppPurchaseAmountSettingResponse {
  Info: PurchaseAmountSetting
}

export {
  CreateAppPurchaseAmountSettingRequest,
  CreateAppPurchaseAmountSettingResponse,
  GetAppPurchaseAmountSettingsRequest,
  GetAppPurchaseAmountSettingsResponse,
  CreateAppUserPurchaseAmountSettingRequest,
  CreateAppUserPurchaseAmountSettingResponse,
  UpdateAppPurchaseAmountSettingRequest,
  UpdateAppPurchaseAmountSettingResponse
}
