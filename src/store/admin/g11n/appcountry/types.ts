import { BaseRequest, AppCountry } from '../../../base'

export interface GetAppCountriesRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetAppCountriesResponse {
  Infos: AppCountry[];
  Total: number;
}
