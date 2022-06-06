import { BaseRequest } from '../../base'

interface CoinSetting {
  ID?: string
  CoinTypeID: string
  WarmAccountCoinAmount: number
  PaymentAccountCoinAmount: number
  GoodIncomingAccountID?: string
  PlatformOfflineAccountID?: string
  UserOfflineAccountID?: string
  UserOnlineAccountID?: string
  GasProvideAccountID?: string
}

interface CreateCoinSettingRequest extends BaseRequest {
  Info: CoinSetting
}

interface CreaetCoinSettingResponse {
  Info: CoinSetting
}

interface UpdateCoinSettingRequest extends BaseRequest {
  Info: CoinSetting
}

interface UpdateCoinSettingResponse {
  Info: CoinSetting
}

interface GetCoinSettingsRequest extends BaseRequest {
}

interface GetCoinSettingsResponse {
  Infos: Array<CoinSetting>
}

interface CoinSettingState {
  CoinSettings: Array<CoinSetting>
}

export {
  CoinSetting,
  CreateCoinSettingRequest,
  CreaetCoinSettingResponse,
  UpdateCoinSettingRequest,
  UpdateCoinSettingResponse,
  GetCoinSettingsRequest,
  GetCoinSettingsResponse,
  CoinSettingState
}
