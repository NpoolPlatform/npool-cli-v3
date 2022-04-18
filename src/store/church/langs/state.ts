import { AppLanguage, Language, Message } from '../../frontend'

interface LanguageState {
  Languages: Map<string, Array<Language>>
  Messages: Map<string, Map<string, Array<Message>>>
  AppLangs: Map<string, Array<AppLanguage>>
}

export {
  LanguageState
}
