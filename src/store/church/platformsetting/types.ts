import { BaseRequest } from '../../base'

interface PlatformSetting {
  ID?: string
  WarmAccountUSDAmount: number
  PaymentAccountUSDAmount: number
  WithdrawAutoReviewUSDAmount: number
}

interface CreatePlatformSettingRequest extends BaseRequest {
  Info: PlatformSetting
}

interface CreatePlatformSettingResponse {
  Info: PlatformSetting
}

interface UpdatePlatformSettingRequest extends BaseRequest {
  Info: PlatformSetting
}

interface UpdatePlatformSettingResponse {
  Info: PlatformSetting
}

interface GetPlatformSettingRequest extends BaseRequest {
}

interface GetPlatformSettingResponse {
  Info: PlatformSetting
}

interface PlatformSettingState {
  PlatformSetting: PlatformSetting
}

export {
  PlatformSetting,
  CreatePlatformSettingRequest,
  CreatePlatformSettingResponse,
  UpdatePlatformSettingRequest,
  UpdatePlatformSettingResponse,
  GetPlatformSettingRequest,
  GetPlatformSettingResponse,
  PlatformSettingState
}
