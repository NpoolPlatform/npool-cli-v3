import { AppGood, Recommend, Promotion, Good } from '../../frontend'
import { BaseRequest } from '../../base'

interface GetAllGoodsRequest extends BaseRequest {
}

interface GetAllGoodsResponse {
  Infos: Array<Good>
}

interface GetRecommendsRequest extends BaseRequest {
}

interface GetRecommendsResponse {
  Infos: Array<Recommend>
}

interface CreateRecommendRequest extends BaseRequest {
  Info: Recommend
}

interface CreateRecommendResponse {
  Info: Recommend
}

interface UpdateRecommendRequest extends BaseRequest {
  Info: Recommend
}

interface UpdateRecommendResponse {
  Info: Recommend
}

interface SetGoodPriceRequest extends BaseRequest {
  Info: AppGood
}

interface SetGoodPriceResponse {
  Info: AppGood
}

interface OnlineGoodRequest extends BaseRequest {
  Info: AppGood
}

interface OnlineGoodResponse {
  Info: AppGood
}

interface OfflineGoodRequest extends BaseRequest {
  Info: AppGood
}

interface OfflineGoodResponse {
  Info: AppGood
}

interface UpdateAppGoodRequest extends BaseRequest {
  Info: AppGood
}

interface UpdateAppGoodResponse {
  Info: AppGood
}

interface CreatePromotionRequest extends BaseRequest {
  Info: Promotion
}

interface CreatePromotionResponse {
  Info: Promotion
}

interface UpdatePromotionRequest extends BaseRequest {
  Info: Promotion
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
  UpdateAppGoodRequest,
  UpdateAppGoodResponse,
  CreatePromotionRequest,
  CreatePromotionResponse,
  UpdatePromotionRequest,
  UpdatePromotionResponse,
  GetRecommendsRequest,
  GetRecommendsResponse
}
