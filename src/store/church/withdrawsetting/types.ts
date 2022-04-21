import {
  CreateWithdrawSettingRequest,
  CreateWithdrawSettingResponse,
  GetWithdrawSettingsRequest,
  GetWithdrawSettingsResponse
} from '../../admin'


interface CreateAppWithdrawSettingRequest extends CreateWithdrawSettingRequest {
  TargetAppID: string
}

interface CreateAppWithdrawSettingResponse extends CreateWithdrawSettingResponse {
}

interface GetAppWithdrawSettingsRequest extends GetWithdrawSettingsRequest {
  TargetAppID: string
}

interface GetAppWithdrawSettingsResponse extends GetWithdrawSettingsResponse {
}

export {
  CreateAppWithdrawSettingRequest,
  CreateAppWithdrawSettingResponse,
  GetAppWithdrawSettingsRequest,
  GetAppWithdrawSettingsResponse
}
