import { BaseRequest, AppCountry } from '../../../base'

export interface CreateAppCountryRequest extends BaseRequest {
  TargetAppID: string;
  CountryID: string;
}

export interface CreateAppCountryResponse {
  Info: AppCountry;
}

export interface DeleteAppCountryRequest extends BaseRequest {
  ID: string;
  TargetAppID: string;
}

export interface DeleteAppCountryResponse {
  Info: AppCountry;
}

export interface GetAppCountriesRequest extends BaseRequest {
  TargetAppID: string;
  Offset: number;
  Limit: number;
}

export interface GetAppCountriesResponse {
  Infos: AppCountry[];
  Total: number;
}
