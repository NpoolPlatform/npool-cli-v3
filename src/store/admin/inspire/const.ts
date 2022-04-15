enum API {
  GET_INVITATION_CODES = '/cloud-hashing-inspire/v1/get/user/invitation/codes/by/app',
  CREATE_INVITATION_CODE = '/cloud-hashing-inspire/v1/create/user/invitation/code/for/app/other/user',

  CREATE_COMMISSION_SETTING = '/cloud-hashing-inspire/v1/create/app/commission/setting',
  UPDATE_COMMISSION_SETTING = '/cloud-hashing-inspire/v1/update/app/commission/setting',
  GET_COMMISSION_SETTING = '/cloud-hashing-inspire/v1/get/app/commission/setting/by/app',

  CREATE_PURCHASE_AMOUNT_SETTING = '/cloud-hashing-inspire/v1/create/app/purchase/amount/setting',
  GET_PURCHASE_AMOUNT_SETTINGS = '/cloud-hashing-inspire/v1/get/app/purchase/amount/settings/by/app',

  GET_COMMISSION_COINS_SETTINGS = '/cloud-hashing-inspire/v1/get/commission/coin/settings'
}

export {
  API
}
