const OrderTimeoutSeconds = 6 * 60 * 60

enum OrderState {
  DEFAULT_STATE = 'DefaultState',
  WAIT_PAYMENT = 'WaitPayment',
  PAID = 'Paid',
  PAYMENT_TIMEOUT = 'PaymentTimeout',
  USER_CANCELED = 'UserCanceled',
  CANCELED = 'Canceled',
  IN_SERVICE = 'InService',
  EXPIRED = 'Expired',
}
export { OrderTimeoutSeconds, OrderState }