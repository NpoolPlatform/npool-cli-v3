import { AppCoin } from '../../../base'
import { BaseRequest } from '../../../base';

export interface GetAppCoinsRequest extends BaseRequest {
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
  UserID?: string;
  CoinTypeID: string;
  Name: string;
  DisplayNames: string[];
  Logo: string;
  ForPay: boolean;
  WithdrawAutoReviewAmount: string;
  MarketValue: string;
  SettlePercent: number;
  SettleTips: string[];
  DailyRewardAmount: string;
  Display?: boolean;
  DisplayIndex: number;
  NeedMemo: boolean;
}

export interface UpdateAppCoinResponse {
  Info: AppCoin;
}