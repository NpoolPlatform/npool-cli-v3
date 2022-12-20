import { BaseRequest, FiatCurrency, FiatCurrencyType } from '../../../base'

export interface CreateFiatCurrencyTypeRequest extends BaseRequest {
  Name: string;
}

export interface CreateFiatCurrencyTypeResponse {
  Info: FiatCurrencyType;
}

export interface GetFiatCurrencyTypesRequest extends BaseRequest {
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetFiatCurrencyTypesResponse {
  Infos: FiatCurrencyType[];
  /** @format int64 */
  Total: number;
}

export interface UpdateFiatCurrencyTypeRequest extends BaseRequest {
  ID: string;
  Name: string;
}

export interface UpdateFiatCurrencyTypeResponse {
  Info: FiatCurrencyType;
}

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
