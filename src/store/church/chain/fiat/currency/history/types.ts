import { BaseRequest, FiatCurrency } from '../../../../../base'
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
