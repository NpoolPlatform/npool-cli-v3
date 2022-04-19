import { AppGood, Recommend, Promotion, PriceCurrency } from '../../frontend'

interface GoodState {
  AppGoods: Map<string, Array<AppGood>>
  Recommends: Map<string, Array<Recommend>>
  Promotions: Map<string, Array<Promotion>>
  PriceCurrencies: Array<PriceCurrency>
}

export {
  GoodState
}
