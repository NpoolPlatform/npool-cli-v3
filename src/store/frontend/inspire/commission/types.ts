import { BaseRequest, Commission, SettleType } from '../../../base'


export interface CreateCommissionRequest extends BaseRequest {
  TargetUserID: string;
  GoodID: string;
  SettleType: SettleType;
  Value: string;
  /** @format int64 */
  StartAt: number;
}

export interface CreateCommissionResponse {
  Info: Commission;
}

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
