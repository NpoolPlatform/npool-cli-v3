import { BaseRequest } from 'src/store/base'
import { WithdrawState } from './state'

export interface Withdraw {
  CoinTypeID: string;
  CoinName: string;
  CoinLogo: string;
  CoinUnit: string;
  Amount: string;
  CreatedAt: number;
  Address: string;
  AddressLabels: string;
  State: WithdrawState;
  Message: string;
}

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
