import { ReqMessage } from '../../local'
import { AppGood, Recommend, Promotion } from '../../frontend'

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

export {
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
}
