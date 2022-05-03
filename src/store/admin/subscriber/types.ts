import { EmailSubscriber } from '../../frontend'
import { BaseRequest } from '../../base'

interface GetEmailSubscribersRequest extends BaseRequest {
}

interface GetEmailSubscribersResponse {
  Infos: Array<EmailSubscriber>
}

export {
  GetEmailSubscribersRequest,
  GetEmailSubscribersResponse
}
