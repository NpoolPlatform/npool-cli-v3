import { AppGood, Recommend, Promotion } from '../../frontend'

interface GoodState {
  AppGoods: Array<AppGood>
  Recommends: Array<Recommend>
  Promotions: Array<Promotion>
}

export {
  GoodState
}
