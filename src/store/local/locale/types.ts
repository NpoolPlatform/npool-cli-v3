import { Composer, LocaleMessages, VueMessageType } from 'vue-i18n'
import { Language, Message } from '../../frontend/langs/types'

interface LocaleState {
  Languages: Array<Language>
  Messages: LocaleMessages<VueMessageType>
  LangMessages: Map<string, Array<Message>>
  CurLang?: Language
  I18n: Composer<unknown, unknown, unknown, any>
}

export {
  LocaleState
}
