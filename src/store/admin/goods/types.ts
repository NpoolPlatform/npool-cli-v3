import { ReqMessage } from '../../local'

interface AppGood {
  ID?: string
  GoodID: string
  Price: number
  Online: boolean
  InitAreaStrategy?: string
}

interface Recommend {
  ID: string
  GoodID: string
  RecommenderID: string
  Message: string
}

interface Promotion {
  ID?: string
  GoodID: string
  Message: string
  Start: number
  End: string
  Price: string
}

interface GetAppGoodsRequest {
  Message: ReqMessage
}

interface GetAppGoodsResponse {
  Infos: Array<AppGood>
}

interface GetRecommendsRequest {
  Message: ReqMessage
}

interface GetRecommendsResponse {
  Infos: Array<Recommend>
}

interface CreateRecommendRequest {
  Info: Recommend
  Message: ReqMessage
}

interface CreateRecommendResponse {
  Info: Recommend
}

interface UpdateRecommendRequest {
  Info: Recommend
  Message: ReqMessage
}

interface UpdateRecommendResponse {
  Info: Recommend
}

interface SetGoodPriceRequest {
  Info: AppGood
  Message: ReqMessage
}

interface SetGoodPriceResponse {
  Info: AppGood
}

interface OnlineGoodRequest {
  Info: AppGood
  Message: ReqMessage
}

interface OnlineGoodResponse {
  Info: AppGood
}

interface OfflineGoodRequest {
  Info: AppGood
  Message: ReqMessage
}

interface OfflineGoodResponse {
  Info: AppGood
}

interface CreatePromotionRequest {
  TargetAppID: string
  Info: Promotion
  Message: ReqMessage
}

interface CreatePromotionResponse {
  Info: Promotion
}

interface UpdatePromotionRequest {
  Info: Promotion
  Message: ReqMessage
}

interface UpdatePromotionResponse {
  Info: Promotion
}

interface GetPromotionsRequest {
  TargetAppID: string
  Message: ReqMessage
}

interface GetPromotionsResponse {
  Infos: Array<Promotion>
}

interface GoodState {
  AppGoods: Array<AppGood>
  Recommends: Array<Recommend>
  Promotions: Array<Promotion>
}

export {
  AppGood,
  Recommend,
  Promotion,
  GetAppGoodsRequest,
  GetAppGoodsResponse,
  GetRecommendsRequest,
  GetRecommendsResponse,
  CreateRecommendRequest,
  CreateRecommendResponse,
  UpdateRecommendRequest,
  UpdateRecommendResponse,
  SetGoodPriceRequest,
  SetGoodPriceResponse,
  OnlineGoodRequest,
  OnlineGoodResponse,
  OfflineGoodRequest,
  OfflineGoodResponse,
  CreatePromotionRequest,
  CreatePromotionResponse,
  UpdatePromotionRequest,
  UpdatePromotionResponse,
  GetPromotionsRequest,
  GetPromotionsResponse,
  GoodState
}
