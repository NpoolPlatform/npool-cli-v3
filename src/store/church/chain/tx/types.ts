import { Tx } from '../../../base'
import { BaseRequest } from '../../../base';

export interface GetTxsRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetTxsResponse {
  Infos: Tx[];
  Total: number;
}