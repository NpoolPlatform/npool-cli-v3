enum API {
  GET_COINS = '/sphinx-coininfo/v1/get/coininfos',
  GET_DESCRIPTIONS = '/project-info-manager/v1/get/coin/descriptions',
  GET_PRODUCT_INFOS = '/project-info-manager/v1/get/coin/productinfos',
  GET_CURRENT_FEE = '/cloud-hashing-apis-v2/v1/get/current/fee'
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
