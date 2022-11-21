import { CoinDescription, CoinDescriptionUsedFor as UsedFor } from '../../../base'
import { BaseRequest, MyRequest } from '../../../base';

export interface CreateAppCoinDescriptionRequest extends MyRequest  {
  TargetAppID: string;
  CoinTypeID: string;
  UsedFor: UsedFor;
  Title: string;
  Message: string;
}

export interface CreateAppCoinDescriptionResponse {
  Info:CoinDescription;
}

export interface GetAppCoinDescriptionsRequest extends BaseRequest {
  TargetAppID: string;
  Offset: number;
  Limit: number;
}

export interface GetAppCoinDescriptionsResponse {
  Infos:CoinDescription[];
  Total: number;
}

export interface UpdateAppCoinDescriptionRequest extends MyRequest {
  TargetAppID: string;
  ID: string;
  AppID: string;
  Title: string;
  Message: string;
}

export interface UpdateAppCoinDescriptionResponse {
  Info: CoinDescription;
}