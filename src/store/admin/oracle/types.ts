import { BaseRequest } from '../../base'
import { CurrencyMethod } from './const'

interface CoinCurrency {
  ID?: string
  AppID: string
  CoinTypeID: string
  PriceVSUSDT: number
  AppPriceVSUSDT: number
  OverPercent: number
  CurrencyMethod: CurrencyMethod
}

interface CreateCurrencyRequest extends BaseRequest {
  Info: CoinCurrency
}

interface CreateCurrencyResponse {
  Info: CoinCurrency
}

interface UpdateCurrencyRequest extends BaseRequest {
  Info: CoinCurrency
}

interface UpdateCurrencyResponse {
  Info: CoinCurrency
}

interface GetCurrenciesRequest extends BaseRequest {
}

interface GetCurrenciesResponse {
  Infos: Array<CoinCurrency>
}

export {
  CoinCurrency,
  CreateCurrencyRequest,
  CreateCurrencyResponse,
  UpdateCurrencyRequest,
  UpdateCurrencyResponse,
  GetCurrenciesRequest,
  GetCurrenciesResponse
}
