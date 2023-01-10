import { SettleType, Commission, BaseRequest } from '../../../base';

export interface CreateUserCommissionRequest extends BaseRequest {
  TargetUserID: string;
  GoodID: string;
  SettleType: SettleType;
  Value: string;
  StartAT: string;
}

export interface CreateUserCommissionResponse {
  Info: Commission;
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
