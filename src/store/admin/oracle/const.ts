enum API {
  CREATE_CURRENCY = '/oracle-manager/v1/create/currency',
  UPDATE_CURRENCY = '/oracle-manager/v1/update/currency',
  GET_CURRENCIES = '/oracle-manager/v1/get/currencies'
}

enum CurrencyMethod {
  FixAmount = 'fix-amount',
  OverPercent = 'over-percent'
}

const CurrencyMethods = [
  CurrencyMethod.FixAmount,
  CurrencyMethod.OverPercent
]

export {
  API,
  CurrencyMethod,
  CurrencyMethods
}
