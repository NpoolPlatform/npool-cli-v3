import { EmailSubscriber } from '../../frontend'
import { BaseRequest, Cond } from '../../base'

interface GetEmailSubscribersRequest extends BaseRequest {
  Conds: Map<string, Cond>
}

interface GetEmailSubscribersResponse {
  Infos: Array<EmailSubscriber>
}

export {
  GetEmailSubscribersRequest,
  GetEmailSubscribersResponse
}
