export enum API {
  GET_CURRENCIES = '/chain/v1/get/currencies',
  GET_HISTORIES = '/chain/v1/get/histories',
  GET_COIN_CURRENCIES = 'https://api.coingecko.com/api/v3/simple/price',
}

export enum CoinType {
  USDTERC20 = 'tether'
}
export enum CurrencyType {
  USD = 'usd',
  JPY = 'jpy'
}