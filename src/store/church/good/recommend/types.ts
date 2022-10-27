import { BaseRequest, MyRequest, Recommend } from '../../../base'



export interface CreateAppRecommendRequest extends MyRequest {
  TargetAppID: string;
  GoodID: string;
  RecommenderID: string;
  Message: string;
  RecommendIndex: number;
}

export interface CreateAppRecommendResponse {
  Info: Recommend;
}

export interface GetAppRecommendsRequest extends BaseRequest {
  TargetAppID: string;
  Offset: number;
  Limit: number;
}

export interface GetAppRecommendsResponse {
  Infos: Recommend[];
  Total: number;
}

export interface UpdateAppRecommendRequest extends MyRequest {
  ID: string;
  TargetAppID: string;
  Message: string;
  RecommendIndex?: number;
}

export interface UpdateAppRecommendResponse {
  Info: Recommend;
}
