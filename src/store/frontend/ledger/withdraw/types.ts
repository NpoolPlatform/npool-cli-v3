import { BaseRequest, Withdraw } from '../../../base'

export interface GetWithdrawsRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetWithdrawsResponse {
  Infos: Withdraw[];
  Total: number;
}

export interface CreateWithdrawRequest extends BaseRequest{
  CoinTypeID: string;
  AccountID: string;
  Amount: string;
  AccountType: string;
  Account: string;
  VerificationCode: string;
}

export interface CreateWithdrawResponse {
  Info: Withdraw;
}