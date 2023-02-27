const OrderTimeoutSeconds = 6 * 60 * 60
enum OrderType {
  DefaultOrderType = 'DefaultOrderType',
  Normal = 'Normal',
  Offline = 'Offline',
  Airdrop = 'Airdrop',
}

const OrderTypes = [
  'ALL',
  OrderType.Normal,
  OrderType.Offline,
  OrderType.Airdrop
]

enum OrderState {
  DEFAULT_STATE = 'DefaultState',
  WAIT_PAYMENT = 'WaitPayment',
  PAID = 'Paid',
  PAYMENT_TIMEOUT = 'PaymentTimeout',
  USER_CANCELED = 'UserCanceled',
  CANCELED = 'Canceled',
  IN_SERVICE = 'InService',
  EXPIRED = 'Expired',
  WaitStart = 'WaitStart',
}
export { OrderTimeoutSeconds, OrderState, OrderType, OrderTypes }