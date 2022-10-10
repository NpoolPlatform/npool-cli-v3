import { BaseRequest, MyRequest, AccountType, WithdrawAddress, Address } from '../../../base'



export interface GetWithdrawAddressRequest extends BaseRequest {
}

export interface GetWithdrawAddressResponse {
  Infos: Array<WithdrawAddress>;
  Total: number;
}

export interface SetWithdrawAddressRequest extends MyRequest {
  CoinTypeID: string
  Address: string
  Name?: string
  Message?: string
  Account: string
  AccountType: AccountType
  VerificationCode: string
  Labels: Array<string>
}

export interface SetWithdrawAddressResponse {
  Info: WithdrawAddress
}

export interface DeleteWithdrawAddressRequest extends BaseRequest{
  ID: string
}

export interface DeleteWithdrawAddressResponse {
  Info: Address
}


