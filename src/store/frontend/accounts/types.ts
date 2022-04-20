import { ReqMessage } from '../../local/notifications/types'

interface Account {
  ID: string
  CoinTypeID: string
  Address: string
  CreateAt: number
  PlatformHoldPrivateKey: boolean
}

interface WithdrawAddress {
  ID: string
  CoinTypeID: string
  AccountID: string
  Name: string
  Message: string
  CreateAt: number
  Labels: Array<string>
}

interface WithdrawAccount {
  Address: WithdrawAddress
  State: string
  Message: string
  Account: Account
}

interface GetWithdrawAccountsRequest {
  Message: ReqMessage
}

interface GetWithdrawAccountsResponse {
  Infos: Array<WithdrawAccount>
}

interface SetWithdrawAddressRequest {
  CoinTypeID: string
  Address: string
  Name: string
  Message: string
  Account: string
  AccountType: string
  VerificationCode: string
  Labels: Array<string>
  NotifyMessage: ReqMessage
}

interface SetWithdrawAddressResponse {
  Info: WithdrawAccount
}

interface DeleteWithdrawAddressRequest {
  ID: string
  Message: ReqMessage
}

interface DeleteWithdrawAddressResponse {
  Info: WithdrawAddress
}


interface AccountState {
  Accounts: Array<WithdrawAccount>
}

export {
  Account,
  WithdrawAddress,
  WithdrawAccount,
  GetWithdrawAccountsRequest,
  GetWithdrawAccountsResponse,
  SetWithdrawAddressRequest,
  SetWithdrawAddressResponse,
  DeleteWithdrawAddressRequest,
  DeleteWithdrawAddressResponse,
  AccountState
}
