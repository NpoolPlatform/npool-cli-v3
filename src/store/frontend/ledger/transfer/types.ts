import { AccountType, BaseRequest, Transfer } from '../../../base'

export interface CreateTransferRequest extends BaseRequest {
  Account:          string;
  AccountType:      AccountType;
  VerificationCode: string;
  TargetUserID:     string;
  Amount:           string;
  CoinTypeID:       string;
}

export interface CreateTransferResponse {
  Info: Transfer;
}