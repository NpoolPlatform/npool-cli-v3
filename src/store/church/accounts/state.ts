import { Account, WithdrawAddress } from '../../frontend'
import { GoodPayment } from './types'

interface AccountState {
  Accounts: Array<Account>
  GoodPayments: Array<GoodPayment>
  WithdrawAddresses: Map<string, Array<WithdrawAddress>>
}

export {
  AccountState
}
