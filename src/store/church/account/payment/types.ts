import { BaseRequest, PlatformAccount } from '../../../base'
export interface GetPaymentAccountsRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetPaymentAccountsResponse {
  Infos: PlatformAccount[];
  Total: number;
}

export interface UpdatePaymentAccountRequest extends BaseRequest {
  ID: string;
  Active: boolean;
  Blocked: boolean;
  Locked: boolean;
}

export interface UpdatePaymentAccountResponse {
  Info: PlatformAccount;
}