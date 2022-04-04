import { LocaleMessages, VueMessageType } from 'vue-i18n'
import { ReqMessage } from '../notifications/types'

interface Language {
  ID: string
  Lang: string
  Logo: string
  Name: string
  Short: string
}

interface AppLanguage {
  ID: string
  AppID: string
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
  Languages: Array<Language>
  Messages: LocaleMessages<VueMessageType>
  CurLang?: Language
  Countries: Array<Country>
}

export {
  Language,
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
