import { AccountType, BaseRequest, TransferAddress } from '../../../base'

export interface CreateTransferAddressRequest extends BaseRequest {
  Account:           string;
  AccountType:       AccountType;
  VerificationCode:  string;
  TargetAccount:     string;
  TargetAccountType: AccountType;
}

export interface CreateTransferAddressResponse {
  Info: TransferAddress
}

export interface DeleteTransferAddressRequest extends BaseRequest {
  TransferID: string;
}

export interface DeleteTransferAddressResponse {
  Info: TransferAddress
}

export interface GetTransferAddressesRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}
export interface GetTransferAddressesResponse {
  Infos: Array<TransferAddress>;
  Total: number;
}