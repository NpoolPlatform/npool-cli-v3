import { ReqMessage } from '../../local'
import { AppGood, Recommend, Promotion, Good } from '../../frontend'
import { BaseRequest } from '../../base'

interface GetAllGoodsRequest {
  Message: ReqMessage
}

interface GetAllGoodsResponse {
  Infos: Array<Good>
}

interface GetRecommendsRequest extends BaseRequest {
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

export {
  GetAllGoodsRequest,
  GetAllGoodsResponse,
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
  GetRecommendsRequest,
  GetRecommendsResponse
}
