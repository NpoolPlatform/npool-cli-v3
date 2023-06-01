import { CurrencyFeedType } from '../../../state'
import { BaseRequest } from '../../../../base'

export interface Feed {
  /** @inject_tag: sql:"id" */
  ID: string;
  /** @inject_tag: sql:"fiat_id" */
  FiatID: string;
  /** @inject_tag: sql:"fiat_name" */
  FiatName: string;
  /** @inject_tag: sql:"fiat_logo" */
  FiatLogo: string;
  /** @inject_tag: sql:"fiat_unit" */
  FiatUnit: string;
  /** @inject_tag: sql:"feed_type" */
  FeedType: CurrencyFeedType;
  /** @inject_tag: sql:"feed_fiat_name" */
  FeedFiatName: string;
  /** @inject_tag: sql:"disabled" */
  Disabled: boolean;
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

export interface CreateFeedRequest extends BaseRequest {
  FiatID: string;
  FeedType: CurrencyFeedType;
  FeedFiatName: string;
}

export interface CreateFeedResponse {
  Info: Feed;
}

export interface GetFeedsRequest extends BaseRequest {
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetFeedsResponse {
  Infos: Feed[];
  /** @format int64 */
  Total: number;
}

export interface UpdateFeedRequest extends BaseRequest {
  ID: string;
  FeedFiatName: string;
  Disabled: boolean;
}

export interface UpdateFeedResponse {
  Info: Feed;
}
