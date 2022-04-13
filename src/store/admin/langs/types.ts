import { AppLanguage, Language, Message } from '../../frontend'
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

interface CreateMessageRequset {
  TargetLangID: string
  Info: Message
  Message: ReqMessage
}

interface CreateMessageResponse {
  Info: Message
}

interface UpdateMessageRequset {
  Info: Message
  Message: ReqMessage
}

interface UpdateMessageResponse {
  Info: Message
}

interface LanguageState {
  Languages: Array<Language>
}

export {
  GetLangsRequest,
  GetLangsResponse,
  CreateLangRequest,
  CreateLangResponse,
  CreateMessageRequset,
  CreateMessageResponse,
  UpdateMessageRequset,
  UpdateMessageResponse,
  LanguageState
}
