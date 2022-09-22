import { BaseRequest, SignMethodType, UsedFor } from '../../../base'

export interface SendCodeRequest extends BaseRequest {
  Account: string;
  AccountType: SignMethodType;
  UsedFor: UsedFor;
}

export interface SendCodeResponse{
}