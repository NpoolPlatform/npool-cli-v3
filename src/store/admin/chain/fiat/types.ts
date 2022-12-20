import { BaseRequest, FiatCurrency } from '../../../base'

export interface GetCoinFiatCurrenciesRequest extends BaseRequest {
  FiatCurrencyTypeIDs: string[];
  CoinTypeIDs: string[];
}

export interface GetCoinFiatCurrenciesResponse {
  Infos: FiatCurrency[];
  Total: number;
}

export interface GetHistoriesRequest extends BaseRequest {
  FiatCurrencyTypeID: string;
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
  /** @format int64 */
  StartAt: number;
  /** @format int64 */
  EndAt: number;
}

export interface GetHistoriesResponse {
  Infos: FiatCurrency[];
  /** @format int64 */
  Total: number;
}

export interface GetFiatCurrencyRequest extends BaseRequest {
  FiatCurrencyTypeName: string;
}

export interface GetFiatCurrencyResponse {
  Info: FiatCurrency;
}
