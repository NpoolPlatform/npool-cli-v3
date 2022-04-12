import { Composer } from 'vue-i18n'
import { ReqMessage } from '../../local/notifications/types'
import { Currency } from './const'

interface GetCoinsCurrenciesRequest {
  Currencies: Array<Currency>
  Message: ReqMessage
}

interface CurrencyState {
  Currencies: Map<string, Map<string, number>>
  I18n: Composer<unknown, unknown, unknown, any>
}

export {
  CurrencyState,
  GetCoinsCurrenciesRequest
}
