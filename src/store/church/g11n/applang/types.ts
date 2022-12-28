import { BaseRequest, AppLang } from '../../../base'

export interface CreateAppLangRequest extends BaseRequest {
  TargetAppID: string;
  TargetLangID: string;
  Main: boolean;
}

export interface CreateAppLangResponse {
  Info: AppLang;
}

export interface DeleteAppLangRequest extends BaseRequest {
  ID: string;
  TargetAppID: string;
}

export interface DeleteAppLangResponse {
  Info: AppLang;
}

export interface GetAppLangsRequest extends BaseRequest {
  TargetAppID: string;
  Offset: number;
  Limit: number;
}

export interface GetAppLangsResponse {
  Infos: AppLang[];
  Total: number;
}
