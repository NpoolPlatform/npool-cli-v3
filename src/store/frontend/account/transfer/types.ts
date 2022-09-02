import { AccountType, Transfer } from '../../../base'

export interface CreateTransferRequest {
  AppID:             string;
  UserID:            string;
  Account:           string;
  AccountType:       string;
  VerificationCode:  AccountType;
  TargetAccount:     string;
  TargetAccountType: AccountType;
}

export interface CreateTransferResponse {
  Info: Transfer
}

export interface DeleteTransferRequest {
  TransferID: string;
}

export interface DeleteTransferResponse {
  Info: Transfer
}

export interface GetTransfersRequest {
  Offset: number;
  Limit: number;
}
export interface GetTransfersResponse {
  Infos: Array<Transfer>;
  Total: number;
}