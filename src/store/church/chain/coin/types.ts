import { Coin } from '../../../base'
import { BaseRequest } from '../../../base';

export interface CreateCoinRequest extends BaseRequest{
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

export interface CreateCoinResponse {
  Info: Coin;
}

export interface GetCoinsRequest extends BaseRequest{
  Offset: number;
  Limit: number;
}

export interface GetCoinsResponse {
  Infos: Coin[];
  Total: number;
}

export interface UpdateCoinRequest extends BaseRequest {
  ID: string;
  Presale: boolean;
  ReservedAmount: string;
  ForPay: boolean;
  HomePage: string;
  Specs: string;
  FeeCoinTypeID: string;
  WithdrawFeeByStableUSD: boolean;
  WithdrawFeeAmount: string;
  CollectFeeAmount: string;
  HotWalletFeeAmount: string;
  LowFeeAmount: string;
  HotWalletAccountAmount: string;
  PaymentAccountCollectAmount: string;
}

export interface UpdateCoinResponse {
  Info: Coin;
}