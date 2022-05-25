enum API {
  GET_COINS = '/sphinx-coininfo/v1/get/coininfos',
  GET_DESCRIPTIONS = '/project-info-manager/v1/get/coin/descriptions'
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

const DefaultCoinPageSize = 100

export {
  API,
  CoinDescriptionUsedFor,
  CoinDescriptionUsedFors,
  CoinEnvironment,
  CoinEnvironments,
  DefaultCoinPageSize
}
