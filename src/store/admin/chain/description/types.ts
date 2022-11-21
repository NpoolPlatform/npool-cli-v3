import { CoinDescription, CoinDescriptionUsedFor as UsedFor } from '../../../base'
import { BaseRequest, MyRequest } from '../../../base';

export interface CreateCoinDescriptionRequest extends MyRequest {
  AppID: string;
  CoinTypeID: string;
  UsedFor: UsedFor;
  Title: string;
  Message: string;
}

export interface CreateCoinDescriptionResponse {
  Info: CoinDescription;
}

export interface GetCoinDescriptionsRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetCoinDescriptionsResponse {
  Infos: CoinDescription[];
  Total: number;
}

export interface UpdateCoinDescriptionRequest extends MyRequest {
  ID: string;
  AppID: string;
  Title: string;
  Message: string;
}

export interface UpdateCoinDescriptionResponse {
  Info: CoinDescription;
}