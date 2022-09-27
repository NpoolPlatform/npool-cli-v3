import { General, BaseRequest } from '../../../base'


export interface GetAppGeneralsRequest extends BaseRequest {
  TargetAppID: string;
  Offset: number;
  Limit: number;

}

export interface GetAppGeneralsResponse {
  Infos: Array<General>;
  Total: number;
}