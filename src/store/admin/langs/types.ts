import { AppLanguage, Language } from '../../frontend'
import { ReqMessage } from '../../local'

interface GetLangsRequest {
  Message: ReqMessage
}

interface GetLangsResponse {
  Infos: Array<Language>
}

interface CreateLangRequest {
  Info: AppLanguage
  Message: ReqMessage
}

interface CreateLangResponse {
  Info: AppLanguage
}

interface LanguageState {
  Languages: Array<Language>
}

export {
  GetLangsRequest,
  GetLangsResponse,
  CreateLangRequest,
  CreateLangResponse,
  LanguageState
}
