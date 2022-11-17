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

export interface UpdateAppCoinRequest  extends BaseRequest{
  ID: string;
  AppID: string;
  UserID: string;
  CoinTypeID: string;
  Name: string;
  Logo: string;
  ForPay: boolean;
  WithdrawAutoReviewAmount: string;
  MarketValue: string;
  SettlePercent: number;
}

export interface UpdateAppCoinResponse {
  Info: AppCoin;
}