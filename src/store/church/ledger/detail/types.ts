import { Detail, BaseRequest } from '../../../base'


export interface GetAppDetailsRequest extends BaseRequest {
  TargetAppID: string;
  Offset: number;
  Limit: number;
}

export interface GetAppDetailsResponse {
  Infos: Array<Detail>;
  Total: number;
}