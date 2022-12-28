import { BaseRequest, AppLang } from '../../../base'

export interface UpdateAppLangRequest extends BaseRequest {
  ID: string;
  Main: boolean;
}

export interface UpdateAppLangResponse {
  Info: AppLang;
}

export interface GetAppLangsRequest extends BaseRequest {
  LangID?: string;
  Offset: number;
  Limit: number;
}

export interface GetAppLangsResponse {
  Infos: AppLang[];
  Total: number;
}
