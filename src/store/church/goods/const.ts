enum API {
  GET_APP_GOODS = '/cloud-hashing-goods/v1/get/app/goods/by/other/app',
  AUTHORIZE_GOOD = '/cloud-hashing-goods/v1/authorize/app/good/for/other/app',
  UNAUTHORIZE_GOOD = '/cloud-hashing-goods/v1/unauthorize/app/good',

  GET_RECOMMENDS = '/cloud-hashing-goods/v1/get/recommends/by/other/app',
  CREATE_RECOMMEND = '/cloud-hashing-goods/v1/create/recommend/for/other/app',

  SET_GOOD_PRICE = '/cloud-hashing-goods/v1/set/app/good/price/for/other/app',
  ONSALE_GOOD = '/cloud-hashing-goods/v1/onsale/app/good/for/other/app',
  OFFSALE_GOOD = '/cloud-hashing-goods/v1/offsale/app/good/for/other/app',

  CREATE_PROMOTION = '/cloud-hashing-goods/v1/create/app/good/promotion/for/other/app',
  GET_PROMOTIONS = '/cloud-hashing-goods/v1/get/app/good/promotions/by/other/app'
}

export {
  API
}
