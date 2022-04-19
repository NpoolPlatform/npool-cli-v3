import { UserPaymentBalance } from '../../admin'
import { Payment } from '../../frontend'

interface BillingState {
  Payments: Map<string, Array<Payment>>
  PaymentBalances: Map<string, Array<UserPaymentBalance>>
}

export {
  BillingState
}
