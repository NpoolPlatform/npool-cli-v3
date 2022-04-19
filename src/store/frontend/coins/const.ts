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

enum CoinEnvironment {
  Test = 'test',
  Main = 'main'
}

const CoinEnvironments = [
  CoinEnvironment.Main,
  CoinEnvironment.Test
]

export {
  API,
  CoinDescriptionUsedFor,
  CoinDescriptionUsedFors,
  CoinEnvironment,
  CoinEnvironments
}
