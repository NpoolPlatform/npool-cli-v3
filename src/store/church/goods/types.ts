import {
  GetRecommendsRequest,
  GetRecommendsResponse,
  CreateRecommendRequest,
  CreateRecommendResponse,
  SetGoodPriceRequest,
  SetGoodPriceResponse,
  OnlineGoodRequest,
  OnlineGoodResponse,
  OfflineGoodRequest,
  OfflineGoodResponse,
  CreatePromotionRequest,
  CreatePromotionResponse
} from '../../admin'
import { BaseRequest } from '../../base'
import {
  GetAppGoodsRequest,
  GetAppGoodsResponse,
  GetPromotionsRequest,
  GetPromotionsResponse,
  AppGood
} from '../../frontend'

interface GetTargetAppGoodsRequest extends GetAppGoodsRequest {
  TargetAppID: string
}

interface GetTargetAppGoodsResponse extends GetAppGoodsResponse {
}

interface AuthorizeGoodRequest extends BaseRequest {
  TargetAppID: string
  Info: AppGood
}

interface AuthorizeGoodResponse {
  Info: AppGood
}

interface UnauthorizeGoodRequest extends BaseRequest {
  ID: string
}

interface UnauthorizeGoodResponse {
  Info: AppGood
}

interface GetAppRecommendsRequest extends GetRecommendsRequest {
  TargetAppID: string
}

interface GetAppRecommendsResponse extends GetRecommendsResponse {
}

interface CreateAppRecommendRequest extends CreateRecommendRequest {
  TargetAppID: string
}

interface CreateAppRecommendResponse extends CreateRecommendResponse {
}

interface SetAppGoodPriceRequest extends SetGoodPriceRequest {
  TargetAppID: string
}

interface SetAppGoodPriceResponse extends SetGoodPriceResponse {
}

interface OnlineAppGoodRequest extends OnlineGoodRequest {
  TargetAppID: string
}

interface OnlineAppGoodResponse extends OnlineGoodResponse {
}

interface OfflineAppGoodRequest extends OfflineGoodRequest {
  TargetAppID: string
}

interface OfflineAppGoodResponse extends OfflineGoodResponse {
}

interface GetAppPromotionsRequest extends GetPromotionsRequest {
  TargetAppID: string
}

interface GetAppPromotionsResponse extends GetPromotionsResponse {
}

interface CreateAppPromotionRequest extends CreatePromotionRequest {
  TargetAppID: string
}

interface CreateAppPromotionResponse extends CreatePromotionResponse {
}

export {
  GetTargetAppGoodsRequest,
  GetTargetAppGoodsResponse,
  AuthorizeGoodRequest,
  AuthorizeGoodResponse,
  UnauthorizeGoodRequest,
  UnauthorizeGoodResponse,
  GetAppRecommendsRequest,
  GetAppRecommendsResponse,
  CreateAppRecommendRequest,
  CreateAppRecommendResponse,
  SetAppGoodPriceRequest,
  SetAppGoodPriceResponse,
  OnlineAppGoodRequest,
  OnlineAppGoodResponse,
  OfflineAppGoodRequest,
  OfflineAppGoodResponse,
  GetAppPromotionsRequest,
  GetAppPromotionsResponse,
  CreateAppPromotionRequest,
  CreateAppPromotionResponse
}