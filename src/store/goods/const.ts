enum API {
  GET_GOODS = '/cloud-hashing-apis-v2/v1/get/goods/by/app',
  GET_RECOMMENDS = '/cloud-hashing-apis-v2/v1/get/recommend/goods/by/app',
  GET_PROMOTIONS = '/cloud-hashing-goods/v1/get/app/good/promotions/by/app',
  GET_GOOD = '/cloud-hashing-apis-v2/v1/get/good',
  GET_FEE_TYPES = '/cloud-hashing-goods/v1/get/fee/types',
  GET_APP_GOODS = '/cloud-hashing-goods/v1/get/app/goods'
}

enum FeePayType {
  Amount = 'amount',
  Percent = 'percent'
}

export {
  API,
  FeePayType
}
