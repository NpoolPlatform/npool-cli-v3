import { AccountType, BaseRequest, Transfer } from '../../../base'

export interface CreateTransferRequest extends BaseRequest {
  AppID:             string;
  UserID:            string;
  Account:           string;
  AccountType:       AccountType;
  VerificationCode:  string;
  TargetAccount:     string;
  TargetAccountType: AccountType;
}

export interface CreateTransferResponse {
  Info: Transfer
}

export interface DeleteTransferRequest extends BaseRequest {
  TransferID: string;
}

export interface DeleteTransferResponse {
  Info: Transfer
}

export interface GetTransfersRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}
export interface GetTransfersResponse {
  Infos: Array<Transfer>;
  Total: number;
}