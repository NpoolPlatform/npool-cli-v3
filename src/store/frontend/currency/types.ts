import { Composer } from 'vue-i18n'
import { BaseRequest } from '../../base'
import { Currency } from './const'

interface GetCoinsCurrenciesRequest extends BaseRequest {
  Currencies: Array<Currency>
}

interface GetCoinCurrencyRequest extends BaseRequest {
  Currency: string
}

interface CurrencyData {
  base: string
  currency: string
  amount: string
} 

interface GetCoinCurrencyResponse {
  data: CurrencyData
}

interface CurrencyState {
  Currencies: Map<string, Map<string, number>>
  I18n: Composer<unknown, unknown, unknown, any>
}

export {
  CurrencyState,
  GetCoinsCurrenciesRequest,
  CurrencyData,
  GetCoinCurrencyRequest,
  GetCoinCurrencyResponse
}
