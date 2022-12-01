import { BaseRequest, Detail } from '../../../base'

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


