import { BaseRequest, Withdraw } from '../../base'


export interface GetAppWithdrawsRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetAppWithdrawsResponse {
  Infos: Withdraw[];
  Total: number;
}
