import { BaseRequest, CurrencyFeedType } from '../../../../../base'

export interface FiatCurrency {
  /** @inject_tag: sql:"id" */
  ID: string;
  /** @inject_tag: sql:"fiat_id" */
  FiatID: string;
  /** @inject_tag: sql:"feed_type" */
  FeedType: CurrencyFeedType;
  /** @inject_tag: sql:"fiat_name" */
  FiatName: string;
  /** @inject_tag: sql:"fiat_logo" */
  FiatLogo: string;
  /** @inject_tag: sql:"fiat_unit" */
  FiatUnit: string;
  /** @inject_tag: sql:"market_value_high" */
  MarketValueHigh: string;
  /** @inject_tag: sql:"market_value_low" */
  MarketValueLow: string;
  /**
   * @inject_tag: sql:"created_at"
   * @format int64
   */
  CreatedAt: number;
  /**
   * @inject_tag: sql:"updated_at"
   * @format int64
   */
  UpdatedAt: number;
}

export interface GetHistoriesRequest extends BaseRequest {
  FiatIDs: string[];
  /** @format int64 */
  StartAt: number;
  /** @format int64 */
  EndAt: number;
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetHistoriesResponse {
  Infos: FiatCurrency[];
  /** @format int64 */
  Total: number;
}
