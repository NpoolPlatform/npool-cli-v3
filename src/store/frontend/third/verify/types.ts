import { AccountType, BaseRequest, SignMethodType, UsedFor } from '../../../base'

export interface SendCodeRequest extends BaseRequest {
  Account: string;
  AccountType: SignMethodType | AccountType;
  UsedFor: UsedFor;
  ToUsername: string;
}

export interface SendCodeResponse{
}