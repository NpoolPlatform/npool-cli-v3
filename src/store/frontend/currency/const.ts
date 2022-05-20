enum CoinGeckoAPI {
  GET_COINS_CURRENCIES = 'https://api.coingecko.com/api/v3/simple/price',
}

enum CoinbaseAPI {
  GET_COIN_CURRENCY = 'https://api.coinbase.com/v2/prices/COIN-CURRENCY/sell'
}

const COIN_PATTERN = 'COIN'
const CURRENCY_PATTERN = 'CURRENCY'

enum Currency {
  USD = 'usd',
  JPY = 'jpy'
}

enum CoinType {
  USDTERC20 = 'tether'
}

const PriceCoinName = 'USDT'

export {
  CoinGeckoAPI,
  CoinbaseAPI,
  Currency,
  CoinType,
  PriceCoinName,
  CURRENCY_PATTERN,
  COIN_PATTERN
}
