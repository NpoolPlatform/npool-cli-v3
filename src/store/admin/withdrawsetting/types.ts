import { BaseRequest } from '../../base'

interface WithdrawSetting {
  ID?: string
  AppID?: string
  CoinTypeID: string
  WithdrawAutoReviewCoinAmount: number
}

interface CreateWithdrawSettingRequest extends BaseRequest {
  Info: WithdrawSetting
}

interface CreateWithdrawSettingResponse {
  Info: WithdrawSetting
}

interface UpdateWithdrawSettingRequest extends BaseRequest {
  Info: WithdrawSetting
}

interface UpdateWithdrawSettingResponse {
  Info: WithdrawSetting
}

interface GetWithdrawSettingsRequest extends BaseRequest {
}

interface GetWithdrawSettingsResponse {
  Infos: Array<WithdrawSetting>
}

interface WithdrawSettingState {
  WithdrawSettings: Array<WithdrawSetting>
}

export {
  WithdrawSetting,
  CreateWithdrawSettingRequest,
  CreateWithdrawSettingResponse,
  UpdateWithdrawSettingRequest,
  UpdateWithdrawSettingResponse,
  GetWithdrawSettingsRequest,
  GetWithdrawSettingsResponse,
  WithdrawSettingState
}
