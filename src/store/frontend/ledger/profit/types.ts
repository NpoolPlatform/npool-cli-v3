import { BaseRequest, GoodProfit, Profit } from '../../../base'

export interface GetGoodProfitsRequest extends BaseRequest {
  StartAt?: number;
  EndAt?: number;
  Offset: number;
  Limit: number;
}

export interface GetGoodProfitsResponse {
  Infos: Array<GoodProfit>;
  Total: number;
}

export interface GetIntervalProfitsRequest extends BaseRequest {
  StartAt: number;
  EndAt: number;
  Offset: number;
  Limit: number;
}

export interface GetIntervalProfitsResponse {
  Infos: Array<Profit>;
  Total: number;
}
