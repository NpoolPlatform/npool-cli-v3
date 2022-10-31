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

export interface GetNAppUserAccountsRequest extends BaseRequest {
  TargetAppID: string;
  Offset: number;
  Limit: number;
}

export interface GetNAppUserAccountsResponse {
  Infos: Account[];
  Total: number;
}