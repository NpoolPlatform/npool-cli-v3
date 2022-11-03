import { BaseRequest, AccountUsedFor, PlatformAccount } from '../../../base'
export interface CreatePlatformAccountRequest extends BaseRequest {
  CoinTypeID: string;
  Address: string;
  UsedFor: AccountUsedFor;
}

export interface CreatePlatformAccountResponse {
  Info: PlatformAccount;
}

export interface GetPlatformAccountsRequest  extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetPlatformAccountsResponse {
  Infos: PlatformAccount[];
  Total: number;
}

export interface UpdatePlatformAccountRequest  extends BaseRequest {
  ID: string;
  Backup: boolean;
  Active: boolean;
  Blocked: boolean;
  Locked: boolean;
}

export interface UpdatePlatformAccountResponse {
  Info: PlatformAccount;
}