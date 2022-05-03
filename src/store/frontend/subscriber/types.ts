import { BaseRequest } from '../../base'

interface EmailSubscriber {
  ID?: string
  AppID: string
  EmailAddress: string
}

interface CreateEmailSubscriberRequest extends BaseRequest {
  Info: EmailSubscriber
}

interface CreateEmailSubscriberResponse {
  Info: EmailSubscriber
}

interface SubscriberState {
}

export {
  EmailSubscriber,
  CreateEmailSubscriberRequest,
  CreateEmailSubscriberResponse,
  SubscriberState
}
