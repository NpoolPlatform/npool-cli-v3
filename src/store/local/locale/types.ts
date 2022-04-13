import { Composer, LocaleMessages, VueMessageType } from 'vue-i18n'
import { Language } from '../../frontend/langs/types'

interface LocaleState {
  Languages: Array<Language>
  Messages: LocaleMessages<VueMessageType>
  CurLang?: Language
  I18n: Composer<unknown, unknown, unknown, any>
}

export {
  LocaleState
}
