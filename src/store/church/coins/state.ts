import { Description, ProductInfo } from '../../frontend'

interface CoinState {
  Descriptions: Map<string, Array<Description>>,
  ProductInfos: Map<string, Array<ProductInfo>>
}

export {
  CoinState
}
