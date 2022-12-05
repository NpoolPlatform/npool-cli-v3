import { BaseRequest, Currency } from '../../../base';
import { CurrencyType } from './const';

export interface GetCurrenciesRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetCurrenciesResponse {
  Infos: Currency[];
  Total: number;
}

export interface GetHistoriesRequest extends BaseRequest {
  CoinTypeID: string;
  Offset: number;
  Limit: number;
}

export interface GetHistoriesResponse {
  Infos: Currency[];
  Total: number;
}

export interface GetLegalCurrenciesRequest extends BaseRequest {
  CurrencyType: CurrencyType;
}