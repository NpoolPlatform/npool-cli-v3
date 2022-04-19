enum API {
  CREATE_FEE_TYPE = '/cloud-hashing-goods/v1/create/fee/type',
  UPDATE_FEE_TYPE = '/cloud-hashing-goods/v1/update/fee/type',

  GET_FEES = '/cloud-hashing-goods/v1/get/fees',
  CREATE_FEE = '/cloud-hashing-goods/v1/create/fee'
}

enum FeePayType {
  Amount = 'amount',
  Percent = 'percent'
}

const FeePayTypes = [
  FeePayType.Amount,
  FeePayType.Percent
]

export {
  API,
  FeePayType,
  FeePayTypes
}
