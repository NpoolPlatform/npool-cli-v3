import { ReqMessage } from '../notifications/types'
import { State } from '../state'

interface Account {
  ID: string
  CoinTypeID: string
  Address: string
  CreateAt: number
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

interface AccountState extends State {
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
  AccountState
}
