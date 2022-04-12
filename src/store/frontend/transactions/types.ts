import { ReqMessage } from '../../local/notifications/types'
import { WithdrawType } from './const'

interface Transaction {
  ID: string
  FromAddressID: string
  ToAddressID: string
  CoinTypeID: string
  Amount: number
  Message: string
  CreateAt: number
  State: string
  ChainTransactionID: string
}

interface GetTransactionsRequest {
  Message: ReqMessage
}

interface GetTransactionsResponse {
  Infos: ReadonlyArray<Transaction>
}

interface UserWithdraw {
  ID?: string
  CoinTypeID: string
  WithdrawToAccountID: string
  Amount: number
  WithdrawType: WithdrawType
  PlatformTransactionID?: string
}

interface SubmitUserWithdrawRequest {
  Info: UserWithdraw
  Account: string
  AccountType: string
  VerificationCode: string
  Message: ReqMessage
}

interface UserWithdrawState {
  Withdraw: UserWithdraw
  State: string
  Message: UserWithdrawState
}

interface SubmitUserWithdrawResponse {
  Info: UserWithdrawState
}

interface GetUserWithdrawsRequest {
  Message: ReqMessage
}

interface GetUserWithdrawsResponse {
  Infos: Array<UserWithdraw>
}

interface TransactionState {
  Transactions: Array<Transaction>
  Withdraws: Array<UserWithdrawState>
}

export {
  Transaction,
  GetTransactionsRequest,
  GetTransactionsResponse,
  UserWithdraw,
  UserWithdrawState,
  SubmitUserWithdrawRequest,
  SubmitUserWithdrawResponse,
  GetUserWithdrawsRequest,
  GetUserWithdrawsResponse,
  TransactionState
}
