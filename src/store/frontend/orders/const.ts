enum API {
  SUBMIT_ORDER = '/cloud-hashing-apis-v2/v1/submit/order',
  GET_ORDER = '/cloud-hashing-apis-v2/v1/get/order',
  CREATE_PAYMENT = '/cloud-hashing-apis-v2/v1/create/order/payment',
  GET_ORDERS = '/cloud-hashing-apis-v2/v1/get/orders/by/app/user',
  UPDATE_PAYMENT = '/cloud-hashing-order/v1/update/payment/by/user',
  GET_BASE_ORDERRS = '/cloud-hashing-order/v1/get/orders/by/app/user'
}

const OrderTimeoutSeconds = 6 * 60 * 60
const RemainMax = '06:00:00'

enum PaymentState {
  WAIT = 'wait',
  DONE = 'done',
  FAIL = 'fail',
  TIMEOUT = 'timeout',
  CANCELED = 'canceled'
}

export {
  API,
  OrderTimeoutSeconds,
  PaymentState,
  RemainMax
}
