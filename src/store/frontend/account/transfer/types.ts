import { AccountType, BaseRequest, TransferAccount } from '../../../base'

export interface CreateTransferAccountRequest extends BaseRequest {
  Account:           string;
  AccountType:       AccountType;
  VerificationCode:  string;
  TargetAccount:     string;
  TargetAccountType: AccountType;
}

export interface CreateTransferAccountResponse {
  Info: TransferAccount
}

export interface DeleteTransferAccountRequest extends BaseRequest {
  TransferID: string;
}

export interface DeleteTransferAccountResponse {
  Info: TransferAccount
}

export interface GetTransferAccountsRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}
export interface GetTransferAccountsResponse {
  Infos: Array<TransferAccount>;
  Total: number;
}