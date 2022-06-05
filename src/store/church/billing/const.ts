enum API {
  GET_USER_BENEFITS = '/cloud-hashing-billing/v1/get/user/benefits/by/other/app',
  GET_USER_WITHDRAW_ITEMS = '/cloud-hashing-billing/v1/get/user/withdraw/items/by/other/app',
  GET_COIN_ACCOUNT_TRANSACTIONS = '/cloud-hashing-billing/v1/get/coin/account/transactions/by/other/app',
  GET_PAYMENTS = '/cloud-hashing-order/v1/get/payments/by/other/app',
  GET_USER_PAYMENT_BALANCES= '/cloud-hashing-billing/v1/get/user/payment/balances/by/other/app',
  CREATE_USER_PAYMENT_BALANCE = '/cloud-hashing-billing/v1/create/user/payment/balance/for/other/app/user',
  GET_PLATFORM_BENEFITS = '/cloud-hashing-billing/v1/get/platform/benefits'
}

export {
  API
}
