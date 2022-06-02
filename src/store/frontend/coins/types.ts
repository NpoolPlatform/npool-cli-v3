import { BaseRequest } from '../../base'
import { ReqMessage } from '../../local/notifications/types'
import { CoinDescriptionUsedFor } from './const'

interface Coin {
  ID?: string
  Name?: string
  PreSale: boolean
  Unit?: string
  Logo: string
  ReservedAmount: number
  ENV?: string
  ForPay: boolean
  HomePage?: string
  Specs?: string
}

interface GetCoinsRequest {
  Offset?: number
  Limit?: number
  Message: ReqMessage
}

interface GetCoinsResponse {
  Infos: Array<Coin>
}

interface Description {
  ID?: string
  AppID: string
  CoinTypeID: string
  Title: string
  Message: string
  UsedFor: CoinDescriptionUsedFor
}

interface GetDescriptionsRequest extends BaseRequest {
}

interface GetDescriptionsResponse {
  Infos: Array<Description>
}

interface ProductInfo {
  ID?: string
  AppID: string
  CoinTypeID: string
  ProductPage: string
}

interface GetProductInfosRequest extends BaseRequest {
}

interface GetProductInfosResponse {
  Infos: Array<ProductInfo>
}

interface GetCurrentFeeRequest extends BaseRequest {
  CoinTypeID: string
}

interface GetCurrentFeeResponse {
  FeeAmount: number
}

interface CoinState {
  Coins: Array<Coin>
  Descriptions: Map<string, Map<string, Description>>
  ProductInfos: Map<string, ProductInfo>
  Currencies: Map<string, Map<string, number>>
}

export {
  Coin,
  CoinState,
  GetCoinsRequest,
  GetCoinsResponse,
  Description,
  GetDescriptionsRequest,
  GetDescriptionsResponse,
  ProductInfo,
  GetProductInfosRequest,
  GetProductInfosResponse,
  GetCurrentFeeRequest,
  GetCurrentFeeResponse
}
