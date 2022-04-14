import { AppGood, Recommend, Promotion, Good } from '../../frontend'

interface GoodState {
  Goods: Array<Good>
  AppGoods: Array<AppGood>
  Recommends: Array<Recommend>
  Promotions: Array<Promotion>
}

export {
  GoodState
}
