import { AppLanguage, Message } from '../../frontend'
import { ReqMessage } from '../../local'

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

interface CreateMessagesRequest {
  TargetLangID: string
  Infos: Array<Message>
  Message: ReqMessage
}

interface CreateMessagesResponse {
  Infos: Array<Message>
}

interface UpdateMessageRequset {
  Info: Message
  Message: ReqMessage
}

interface UpdateMessageResponse {
  Info: Message
}

export {
  CreateLangRequest,
  CreateLangResponse,
  CreateMessageRequset,
  CreateMessageResponse,
  UpdateMessageRequset,
  UpdateMessageResponse,
  CreateMessagesRequest,
  CreateMessagesResponse
}
