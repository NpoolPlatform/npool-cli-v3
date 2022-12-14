import { BaseRequest, GoodProfit, Profit } from '../../../base'

export interface GetGoodProfitsRequest extends BaseRequest {
  Offset: number;
  Limit: number;
  StartAt: number;
  EndAt: number;
}

export interface GetGoodProfitsResponse {
  Infos: Array<GoodProfit>;
  Total: number;
}

export interface GetIntervalGoodProfitsRequest extends BaseRequest {
  StartAt: number;
  EndAt: number;
  Offset: number;
  Limit: number;
}

export interface GetIntervalGoodProfitsResponse {
  Infos: Array<GoodProfit>;
  Total: number;
}
export interface GetProfitsRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetProfitsResponse {
  Infos: Profit[];
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
