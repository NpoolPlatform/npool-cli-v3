import { BaseRequest, Good } from '../../../base'


export interface CreateGoodRequest extends BaseRequest {
  DeviceInfoID: string;
  DurationDays: number;
  CoinTypeID: string;
  InheritFromGoodID?: string;
  VendorLocationID: string;
  Price: string;
  BenefitType: string;
  GoodType: string;
  Title: string;
  Unit: string;
  UnitAmount: number;
  SupportCoinTypeIDs: string[];
  DeliveryAt: number;
  StartAt: number;
  TestOnly: boolean;
  Total: number;
  Locked: number;
  InService: number;
  Sold: number;
  Posters: string[];
  Labels: string[];
}

export interface CreateGoodResponse {
  Info: Good
}

export interface GetGoodsRequest extends BaseRequest{
  Offset: number
  Limit: number
}

export interface GetGoodsResponse {
  Infos: Array<Good>
  Total: number
}

export interface GetGoodRequest extends BaseRequest {
  ID: string
}

export interface GetGoodResponse {
  Info: Good
}

export interface UpdateGoodRequest extends BaseRequest{
  ID: string;
  DeviceInfoID: string;
  DurationDays: number;
  CoinTypeID: string;
  InheritFromGoodID: string;
  VendorLocationID: string;
  Price: string;
  Title: string;
  Unit: string;
  UnitAmount: number;
  SupportCoinTypeIDs: string[];
  DeliveryAt: number;
  StartAt: number;
  TestOnly: boolean;
  Total: number;
  Sold: number;
  Posters: string[];
  Labels: string[];
}

export interface UpdateGoodResponse {
  Info: Good
}
