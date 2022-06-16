import { BaseRequest } from '../../base'
import {
  CreatePurchaseAmountSettingRequest,
  CreatePurchaseAmountSettingResponse,
  CreateUserPurchaseAmountSettingRequest,
  CreateUserPurchaseAmountSettingResponse,
  GetAppPurchaseAmountSettingsRequest,
  GetAppPurchaseAmountSettingsResponse
} from '../../admin'
import { PurchaseAmountSetting } from '../../frontend'

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

interface GetTargetAppPurchaseAmountSettingsRequest extends GetAppPurchaseAmountSettingsRequest {
  TargetAppID: string
}

interface GetTargetAppPurchaseAmountSettingsResponse extends GetAppPurchaseAmountSettingsResponse {
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
  GetTargetAppPurchaseAmountSettingsRequest,
  GetTargetAppPurchaseAmountSettingsResponse,
  CreateAppUserPurchaseAmountSettingRequest,
  CreateAppUserPurchaseAmountSettingResponse,
  UpdateAppPurchaseAmountSettingRequest,
  UpdateAppPurchaseAmountSettingResponse
}
