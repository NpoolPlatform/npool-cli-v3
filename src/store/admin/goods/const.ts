enum API {
  GET_GOODS = '/cloud-hashing-apis-v2/v1/get/goods',
  SET_GOOD_PRICE = '/cloud-hashing-goods/v1/set/app/good/price',
  ONSALE_GOOD = '/cloud-hashing-goods/v1/onsale/app/good',
  OFFSALE_GOOD = '/cloud-hashing-goods/v1/offsale/app/good',

  GET_RECOMMENDS = '/cloud-hashing-goods/v1/get/recommends/by/app',
  CREATE_RECOMMEND = '/cloud-hashing-goods/v1/create/recommend',
  UPDATE_RECOMMEND = '/cloud-hashing-goods/v1/update/recommend',

  CREATE_PROMOTION = '/cloud-hashing-goods/v1/create/app/good/promotion',
  UPDATE_PROMOTION = '/cloud-hashing-goods/v1/update/app/good/promotion',
  GET_PROMOTIONS = '/cloud-hashing-goods/v1/get/app/good/promotions'
}

export {
  API
}
