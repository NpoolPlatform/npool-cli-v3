import { BaseRequest, PaymentAccount } from '../../../base'
export interface GetPaymentAccountsRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetPaymentAccountsResponse {
  Infos: PaymentAccount[];
  Total: number;
}

export interface UpdatePaymentAccountRequest extends BaseRequest {
  ID: string;
  Active: boolean;
  Blocked: boolean;
  Locked: boolean;
}

export interface UpdatePaymentAccountResponse {
  Info: PaymentAccount;
}