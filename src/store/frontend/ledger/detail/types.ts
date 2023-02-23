import { BaseRequest, Detail, MiningReward } from '../../../base'

export interface GetDetailsRequest extends BaseRequest {
  StartAt?: number;
  EndAt?: number;
  Offset: number;
  Limit: number;
}
export interface GetDetailsResponse {
  Infos: Detail[];
  Total: number;
}

export interface GetMiningRewardsRequest extends BaseRequest {
  StartAt?: number;
  EndAt?: number;
  Offset: number;
  Limit: number;
}
export interface GetMiningRewardsResponse {
  Infos: MiningReward[];
  Total: number;
}

