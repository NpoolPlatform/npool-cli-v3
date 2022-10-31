import { Account, BaseRequest } from '../../../base';

export interface GetAppUserAccountsRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetAppUserAccountsResponse {
  Infos: Account[];
  Total: number;
}

export interface GetDepositAccountsRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetDepositAccountsResponse {
  Infos: Account[];
  Total: number;
}