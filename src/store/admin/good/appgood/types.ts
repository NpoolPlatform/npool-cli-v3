import { BaseRequest, AppGood, SettleType, CancelMode } from '../../../base'


export interface GetAppGoodsRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetAppGoodsResponse {
  Infos: AppGood[];
  Total: number;
}
export interface GetAppGoodRequest extends BaseRequest {
  GoodID: string;
}

export interface GetAppGoodResponse {
  Info: AppGood;
}

export interface UpdateAppGoodRequest extends BaseRequest {
  ID: string;
  Online: boolean;
  Visible: boolean;
  GoodName: string;
  ProductPage?: string;
  Price: string;
  DisplayIndex: number;
  PurchaseLimit: number;
  CommissionPercent: number;
  SaleStartAt?: number;
  SaleEndAt?: number;
  ServiceStartAt?: number;
  TechnicalFeeRatio?: number;
  ElectricityFeeRatio?: number;
  DailyRewardAmount?: string;
  CommissionSettleType?: SettleType;
  Descriptions?: string[];
  DisplayColors?: string[];
  GoodBanner?: string;
  DisplayNames?: string[];
  EnablePurchase?: boolean;
  EnableProductPage?: boolean;
  UserPurchaseLimit?: string;
  CancelMode?: CancelMode;
  CancellableBeforeStart?: number;
}

export interface UpdateAppGoodResponse {
  Info: AppGood;
}
