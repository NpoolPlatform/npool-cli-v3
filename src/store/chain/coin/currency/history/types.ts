import { CurrencyFeedType } from '../../../state'
import { BaseRequest } from '../../../../base'

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

export interface GetCurrencyHistoriesRequest extends BaseRequest {
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

export interface GetCurrencyHistoriesResponse extends BaseRequest {
  Infos: Currency[];
  /** @format int64 */
  Total: number;
}
