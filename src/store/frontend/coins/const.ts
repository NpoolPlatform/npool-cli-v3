enum API {
  GET_COINS = '/sphinx-coininfo/v1/get/coininfos',
  GET_DESCRIPTION = '/sphinx-coininfo/v1/get/coin/description/by/coin'
}

enum CoinDescriptionUsedFor {
  ProductDetail = 'PRODUCTDETAILS'
}

const CoinDescriptionUsedFors = [
  CoinDescriptionUsedFor.ProductDetail
]

export {
  API,
  CoinDescriptionUsedFor,
  CoinDescriptionUsedFors
}
