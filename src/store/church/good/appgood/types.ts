import { BaseRequest, AppGood } from '../../../base'



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
}

export interface CreateAppGoodResponse {
  Info: AppGood;
}
