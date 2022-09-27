import { BaseRequest, Account } from '../../../base'


export interface GetAppDepositAccountsRequest extends BaseRequest {
  TargetAppID: string;
  Offset: number;
  Limit: number;

}

export interface GetAppDepositAccountsResponse {
  Infos: Array<Account>;
  Total: number;
}