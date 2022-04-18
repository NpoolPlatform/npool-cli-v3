import { BaseRequest } from '../../base'
import { Country, Language } from '../../frontend'

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
  UpdateCountryResponse
}
