import { BaseRequest, CurrencyFeedType } from '../../../../base'

export interface Currency {
  ID: string;
  CoinTypeID: string;
  CoinName: string;
  CoinLogo: string;
  CoinUnit: string;
  CoinENV: string;
  CreatedAt: number;
  UpdatedAt: number;
  MarketValueHigh: string;
  MarketValueLow: string;
  FeedType: CurrencyFeedType;
}

export interface GetCurrencyRequest extends BaseRequest {
  CoinTypeID: string;
  /** @format int64 */
  StartAt: number;
  /** @format int64 */
  EndAt: number;
}

export interface GetCurrencyResponse {
  Info: Currency;
  /** @format int64 */
  Total: number;
}

export interface GetCoinCurrenciesRequest extends BaseRequest {
  CoinTypeIDs: string[];
  /** @format int64 */
  StartAt: number;
  /** @format int64 */
  EndAt: number;
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetCoinCurrenciesResponse {
  Infos: Currency[];
  /** @format int64 */
  Total: number;
}
