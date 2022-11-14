import { BaseRequest, Withdraw } from '../../../base'

export interface GetAppWithdrawsRequest extends BaseRequest {
  TargetAppID: string;
  Offset: number;
  Limit: number;
}

export interface GetAppWithdrawsResponse {
  Infos: Withdraw[];
  Total: number;
}