import { Benefit, Transaction, UserWithdraw, Payment, UserPaymentBalance } from '../../frontend'

interface BillingState {
  UserBenefits: Array<Benefit>
  Transactions: Array<Transaction>
  Payments: Array<Payment>
  PaymentBalances: Array<UserPaymentBalance>
  Withdraws: Array<UserWithdraw>
}

export {
  BillingState
}