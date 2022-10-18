
import { BaseRequest, General } from '../../../base'

export interface GetGeneralsRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetGeneralsResponse {
  Infos: Array<General>;
  Total: number;
}

export interface GetIntervalGeneralsRequest extends BaseRequest {
  StartAt?: number;
  EndAt?: number;
  Offset: number;
  Limit: number;
}

export interface GetIntervalGeneralsResponse {
  Infos: Array<General>;
  Total: number;
}
