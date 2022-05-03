import { GetEmailSubscribersRequest, GetEmailSubscribersResponse } from '../../admin'

interface GetAppEmailSubscribersRequest extends GetEmailSubscribersRequest {
  TargetAppID: string
}

interface GetAppEmailSubscribersResponse extends GetEmailSubscribersResponse {
}

export {
  GetAppEmailSubscribersRequest,
  GetAppEmailSubscribersResponse
}
