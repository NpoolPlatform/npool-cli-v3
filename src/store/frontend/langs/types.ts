import { Composer } from 'vue-i18n'
import { ReqMessage } from '../../local/notifications/types'

interface Language {
  ID: string
  Lang: string
  Logo: string
  Name: string
  Short: string
}

interface AppLanguage {
  ID?: string
  LangID: string
}

interface AppLangInfo {
  AppLang: AppLanguage
  Lang: Language
}

interface Country {
  ID?: string
  Country: string
  Flag: string
  Code: string
  Short: string
}

interface Message {
  ID: string
  MessageID: string
  LangID: string
  Message: string
}

interface GetLangsRequest {
  Message: ReqMessage
}

interface GetLangsResponse {
  Infos: Array<AppLangInfo>
}

interface GetLangMessagesRequest {
  TargetLangID?: string
  LangID: string
  Message: ReqMessage
}

interface GetLangMessagesResponse {
  Infos: Array<Message>
}

interface GetCountriesRequest {
  Message: ReqMessage
}

interface GetCountriesResponse {
  Infos: Array<Country>
}

interface LanguageState {
  Countries: Array<Country>
  I18n: Composer<unknown, unknown, unknown, any>
}

export {
  Language,
  AppLanguage,
  AppLangInfo,
  GetLangsRequest,
  GetLangsResponse,
  Message,
  GetLangMessagesRequest,
  GetLangMessagesResponse,
  Country,
  GetCountriesRequest,
  GetCountriesResponse,
  LanguageState
}
