import { BaseRequest, AppGood, CancelMode } from '../../../base'



export interface GetAppGoodsRequest extends BaseRequest {
  TargetAppID: string;
  Offset: number;
  Limit: number;
}

export interface GetAppGoodsResponse {
  Infos: AppGood[];
  Total: number;
}

export interface UpdateAppGoodRequest extends BaseRequest {
  ID: string;
  TargetAppID: string;
  Online: boolean;
  Visible: boolean;
  GoodName: string;
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
  CancelMode?: CancelMode;
  CancellableBeforeStart?: number;
  EnablePurchase?: boolean;
  EnableProductPage?: boolean;
  EnableSetCommission?: boolean;
  UserPurchaseLimit?: string;
}

export interface UpdateAppGoodResponse {
  Info: AppGood;
}

export interface CreateAppGoodRequest extends BaseRequest{
  TargetAppID: string;
  GoodID: string;
  Online: boolean;
  Visible: boolean;
  GoodName: string;
  Price: string;
  DisplayIndex: number;
  PurchaseLimit: number;
  CommissionPercent: number;
  OpenPurchase?: boolean;
  IntoProductPage?: boolean;
  CancelableBefore?: number;
  CancellableBeforeStart?: number;
  UserPurchaseLimit?: string;
  EnablePurchase?: boolean;
  EnableProductPage?: boolean;
  EnableSetCommission?: boolean;
  CancelMode?: CancelMode;
}

export interface CreateAppGoodResponse {
  Info: AppGood;
}
