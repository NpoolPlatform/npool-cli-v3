enum API {
  GET_COUPONS = '/cloud-hashing-inspire/v1/get/coupons/allocated/detail/by/app/user',
  GET_SPECIAL_OFFERS = '/cloud-hashing-inspire/v1/get/user/special/reductions/by/app/user'
}

enum Type {
  FixAmount = 'coupon',
  Discount = 'discount',
  SpecialOffer = 'special-offer'
}

export {
  API,
  Type
}
