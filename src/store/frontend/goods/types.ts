import { Coin } from '../coins/types'
import { ReqMessage } from '../../local/notifications/types'

interface DeviceInfo {
  ID?: string
  Manufacturer: string
  Consumption: number
  ShipmentAt: number
  Type: string
}

interface VendorLocation {
  ID?: string
  Country: string
  Province: string
  City: string
  Address: string
}

interface PriceCurrency {
  ID?: string
  Name: string
  Unit: string
  Symbol: string
}

interface GoodExtra {
  ID: string
  GoodID: string
  Labels: Array<string>
  OutSale: boolean
  Posters: Array<string>
  PreSale: false
  Rating: number
  VoteCount: number
}

interface GoodBase {
  ID?: string
  SeparateFee: boolean
  UnitPower: number
  DurationDays: number
  Actuals: boolean
  DeliveryAt: number
  Price: number
  BenefitType: string
  Classic: boolean
  Title: string
  Total: number
  Unit: string
  StartAt: number
}

interface Fee {
  ID?: string
  FeeTypeID: string
  Value: number
}

interface GoodExtend {
  Good: GoodBase
  DeviceInfo: DeviceInfo
  VendorLocation: VendorLocation
  Fees: Array<Fee>
  PriceCurrency: PriceCurrency
  Extra: GoodExtra
}

interface Good {
  Good: GoodExtend
  Main?: Coin
  SupportCoins?: Array<Coin>
  Sold: number
}

interface GetGoodsRequest {
  Message: ReqMessage
}

interface GetGoodsResponse {
  Infos: Array<Good>
  Total: number
}

interface GetGoodRequest {
  ID: string
  Message: ReqMessage
}

interface GetGoodResponse {
  Info: Good
}

interface Recommend {
  ID: string
  GoodID: string
  RecommenderID: string
  Message: string
}

interface RecommendGood {
  Recommend: Recommend
  Good: Good
}

interface GetRecommendGoodsRequest {
  Message: ReqMessage
}

interface GetRecommendGoodsResponse {
  Infos: Array<RecommendGood>
  Total: number
}

interface Promotion {
  ID?: string
  GoodID: string
  Message: string
  Start: number
  End: number
  Price: number
}

interface GetPromotionsRequest {
  Message: ReqMessage
}

interface GetPromotionsResponse {
  Infos: Array<Promotion>
}

interface FeeType {
  ID?: string
  FeeType: string
  FeeDescription: string
  PayType: string
}

interface GetFeeTypesRequest {
  Message: ReqMessage
}

interface GetFeeTypesResponse {
  Infos: Array<FeeType>
}

interface AppGood {
  ID: string
  GoodID: string
  Price: number
  Online: boolean
  InitAreaStrategy: string
  DisplayIndex: number
}

interface GetAppGoodsRequest {
  Message: ReqMessage
}

interface GetAppGoodsResponse {
  Infos: Array<AppGood>
}

interface GoodState {
  Goods: Array<Good>
  Recommends: Array<RecommendGood>
  Promotions: Array<Promotion>
  FeeTypes: Array<FeeType>
  AppGoods: Array<AppGood>
}

export {
  Fee,
  GoodBase,
  Good,
  RecommendGood,
  GetGoodsRequest,
  GetGoodsResponse,
  GetGoodRequest,
  GetGoodResponse,
  GetRecommendGoodsRequest,
  GetRecommendGoodsResponse,
  GetPromotionsRequest,
  GetPromotionsResponse,
  FeeType,
  GetFeeTypesRequest,
  GetFeeTypesResponse,
  AppGood,
  Recommend,
  Promotion,
  GetAppGoodsRequest,
  GetAppGoodsResponse,
  GoodState
}
