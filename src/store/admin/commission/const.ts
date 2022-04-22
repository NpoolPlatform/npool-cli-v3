enum API {
  CREATE_COMMISSION_SETTING = '/cloud-hashing-inspire/v1/create/app/commission/setting',
  UPDATE_COMMISSION_SETTING = '/cloud-hashing-inspire/v1/update/app/commission/setting',
  GET_COMMISSION_SETTING = '/cloud-hashing-inspire/v1/get/app/commission/setting/by/app',

  GET_COMMISSION_COINS_SETTINGS = '/cloud-hashing-inspire/v1/get/commission/coin/settings'
}

enum CommissionType {
  CommissionByAmount = 'commission-by-amount'
}

const CommissionTypes = [
  CommissionType.CommissionByAmount
]

export {
  API,
  CommissionType,
  CommissionTypes
}
