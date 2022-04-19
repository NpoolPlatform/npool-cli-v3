import { AppGood, Recommend, Promotion } from '../../frontend'

interface GoodState {
  AppGoods: Map<string, Array<AppGood>>
  Recommends: Map<string, Array<Recommend>>
  Promotions: Map<string, Array<Promotion>>
}

export {
  GoodState
}
