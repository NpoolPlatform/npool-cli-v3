import { CreateMessageResponse, CreateMessageRequset, CreateAppLangRequest, CreateAppLangResponse, CreateMessagesRequest, CreateMessagesResponse } from '../../admin'
import { BaseRequest } from '../../base'
import { Country, GetLangMessagesRequest, GetLangMessagesResponse, GetLangsRequest, GetLangsResponse, Language } from '../../frontend'

interface CreateLangRequest extends BaseRequest {
  Info: Language
}

interface CreateLangResponse {
  Info: Language
}

interface CreateLangsRequest extends BaseRequest {
  Infos: Array<Language>
}

interface CreateLangsResponse {
  Infos: Array<Language>
}

interface UpdateLangRequest extends BaseRequest {
  Info: Language
}

interface UpdateLangResponse {
  Info: Language
}

interface CreateCountryRequest extends BaseRequest {
  Info: Country
}

interface CreateCountryResponse {
  Info: Country
}

interface CreateCountriesRequest extends BaseRequest {
  Infos: Array<Country>
}

interface CreateCountriesResponse {
  Infos: Array<Country>
}

interface UpdateCountryRequest extends BaseRequest {
  Info: Country
}

interface UpdateCountryResponse {
  Info: Country
}

interface GetAppLangsRequest extends GetLangsRequest {
  TargetAppID: string
}

interface GetAppLangsResponse extends GetLangsResponse {
}

interface CreateTargetAppLangRequest extends CreateAppLangRequest {
  TargetAppID: string
}

interface CreateTargetAppLangResponse extends CreateAppLangResponse {
}

interface GetAppMessagesRequest extends GetLangMessagesRequest {
  TargetAppID: string
}

interface GetAppMessagesResponse extends GetLangMessagesResponse {
}

interface CreateAppMessageRequest extends CreateMessageRequset {
  TargetAppID: string
}

interface CreateAppMessageResponse extends CreateMessageResponse {
}

interface CreateAppMessagesRequest extends CreateMessagesRequest {
  TargetAppID: string
}

interface CreateAppMessagesResponse extends CreateMessagesResponse {
}

export {
  CreateLangRequest,
  CreateLangResponse,
  CreateLangsRequest,
  CreateLangsResponse,
  UpdateLangRequest,
  UpdateLangResponse,
  CreateCountryRequest,
  CreateCountryResponse,
  CreateCountriesRequest,
  CreateCountriesResponse,
  UpdateCountryRequest,
  UpdateCountryResponse,
  GetAppLangsRequest,
  GetAppLangsResponse,
  CreateTargetAppLangRequest,
  CreateTargetAppLangResponse,
  GetAppMessagesRequest,
  GetAppMessagesResponse,
  CreateAppMessageRequest,
  CreateAppMessageResponse,
  CreateAppMessagesRequest,
  CreateAppMessagesResponse
}
