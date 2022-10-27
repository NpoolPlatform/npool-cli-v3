import { BaseRequest, Recommend, MyRequest } from '../../../base'


export interface GetRecommendsRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetRecommendsResponse {
  Infos: Recommend[];
  Total: number;
}

export interface CreateRecommendRequest extends MyRequest{
  AppID: string;
  GoodID: string;
  RecommenderID: string;
  Message: string;
  RecommendIndex: number;
}

export interface CreateRecommendResponse {
  Info: Recommend;
}

export interface UpdateRecommendRequest extends MyRequest{
  ID: string;
  AppID: string;
  Message: string;
  RecommendIndex: number;
}

export interface UpdateRecommendResponse {
  Info: Recommend;
}
