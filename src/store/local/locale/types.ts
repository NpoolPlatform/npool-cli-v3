import { Composer } from 'vue-i18n'
import { Language, Message } from '../../base/langs'

interface LocaleState {
  Languages: Array<Language>
  LangMessages: Map<string, Array<Message>>
  CurLang?: Language
  I18n: Composer<unknown, unknown, unknown, any>
}

export {
  LocaleState
}
