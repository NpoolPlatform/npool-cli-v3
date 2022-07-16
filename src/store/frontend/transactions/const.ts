enum API {
  GET_TRANSACTIONS = '/cloud-hashing-billing/v1/get/coin/account/transactions/by/app/user',
  SUBMIT_WITHDRAW = '/cloud-hashing-apis-v2/v1/submit/user/withdraw',
  GET_WITHDRAWS = '/cloud-hashing-apis-v2/v1/get/user/withdraws/by/app/user'
}

enum WithdrawType {
  Benefit = 'benefit',
  Commission = 'commission'
}

enum TransactionState {
  Created = 'created',
  Wait = 'wait',
  Paying = 'paying',
  Successful = 'successful',
  Fail = 'fail',
  Rejected = 'rejected'
}

export {
  API,
  WithdrawType,
  TransactionState
}
