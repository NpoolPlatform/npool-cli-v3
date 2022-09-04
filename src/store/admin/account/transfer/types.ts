import { BaseRequest, TransferAccount } from '../../../base'


export interface GetAppTransferAccountsRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}
export interface GetAppTransferAccountsResponse {
  Infos: Array<TransferAccount>;
  Total: number;
}