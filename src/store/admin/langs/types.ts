import { BaseRequest } from '../../base'
import { AppLanguage, Message } from '../../frontend'
import { ReqMessage } from '../../local'

interface CreateAppLangRequest extends BaseRequest {
  Info: AppLanguage
}

interface CreateAppLangResponse {
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
  CreateAppLangRequest,
  CreateAppLangResponse,
  CreateMessageRequset,
  CreateMessageResponse,
  UpdateMessageRequset,
  UpdateMessageResponse,
  CreateMessagesRequest,
  CreateMessagesResponse
}
