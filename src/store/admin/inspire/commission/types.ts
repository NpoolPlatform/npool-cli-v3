import { SettleType, Commission, BaseRequest } from '../../../base';

export interface GetCommissionsRequest extends BaseRequest {
  SettleType: SettleType;
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetCommissionsResponse {
  Infos: Commission[];
  /** @format int64 */
  Total: number;
}

export interface UpdateCommissionRequest extends BaseRequest {
  ID: string;
  Value: string;
  SettleType?: SettleType;
  /** @format int64 */
  StartAt: number;
}

export interface UpdateCommissionResponse {
  Info: Commission;
}

export interface GetAppCommissionsRequest extends BaseRequest {
  /** @format int64 */
  EndAt?: number;
  SettleType: SettleType;
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetAppCommissionsResponse {
  Infos: Commission[];
  /** @format int64 */
  Total: number;
}
