enum API {
  GET_COINS_CURRENCIES = 'https://api.coingecko.com/api/v3/simple/price'
}

enum Currency {
  USD = 'usd',
  JPY = 'jpy'
}

enum CoinType {
  USDTERC20 = 'tether'
}

const PriceCoinName = 'USDT'

export {
  API,
  Currency,
  CoinType,
  PriceCoinName
}
