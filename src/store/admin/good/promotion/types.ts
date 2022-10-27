import { BaseRequest, Promotion, MyRequest } from '../../../base'

export interface CreatePromotionRequest extends MyRequest {
  AppID: string;
  GoodID: string;
  Message: string;
  StartAt: number;
  EndAt: number;
  Price: string;
  Posters: string[];
}

export interface CreatePromotionResponse {
  Info: Promotion;
}

export interface GetPromotionsRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetPromotionsResponse {
  Infos: Promotion[];
  Total: number;
}

export interface UpdatePromotionRequest extends MyRequest {
  ID: string;
  AppID: string;
  Message: string;
  StartAt: number;
  EndAt: number;
  Price: string;
  Posters: string[];
}

export interface UpdatePromotionResponse {
  Info: Promotion;
}
