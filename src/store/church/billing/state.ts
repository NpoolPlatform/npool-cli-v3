import { UserPaymentBalance } from '../../admin'
import { Benefit, Payment, Transaction, UserWithdraw } from '../../frontend'
import { PlatformBenefit } from './types'

interface BillingState {
  Payments: Map<string, Array<Payment>>
  PaymentBalances: Map<string, Array<UserPaymentBalance>>
  UserBenefits: Map<string, Array<Benefit>>
  PlatformBenefits: Array<PlatformBenefit>
  Withdraws: Map<string, Array<UserWithdraw>>
  Transactions: Map<string, Array<Transaction>>
}

export {
  BillingState
}
