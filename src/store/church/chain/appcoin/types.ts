import { AppCoin } from '../../../base'
import { BaseRequest } from '../../../base';

export interface GetAppCoinsRequest extends BaseRequest {
  TargetAppID: string;
  Offset: number;
  Limit: number;
}

export interface GetAppCoinsResponse {
  Infos: AppCoin[];
  Total: number;
}

export interface CreateAppCoinRequest extends BaseRequest{
  TargetAppID: string;
  CoinTypeID: string;
}

export interface CreateAppCoinResponse {
  Info: AppCoin;
}

export interface DeleteAppCoinRequest extends BaseRequest {
  ID: string;
  TargetAppID: string;
}

export interface DeleteAppCoinResponse {
  Info: AppCoin;
}

export interface UpdateAppCoinRequest  extends BaseRequest{
  ID: string;
  AppID: string;
  UserID?: string;
  CoinTypeID: string;
  Name: string;
  Logo: string;
  ForPay: boolean;
  WithdrawAutoReviewAmount: string;
  MarketValue: string;
  SettlePercent: number;
  ProductPage: string;
  DailyRewardAmount: string;
  Env?: string;
}

export interface UpdateAppCoinResponse {
  Info: AppCoin;
}