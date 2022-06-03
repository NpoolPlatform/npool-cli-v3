import { Order } from '../../frontend'
import { BaseRequest } from '../../base'

interface GetTargetAppOrdersRequest extends BaseRequest {
  TargetAppID: string
}

interface GetTargetAppOrdersResponse {
  Infos: Array<Order>
}

export {
  GetTargetAppOrdersRequest,
  GetTargetAppOrdersResponse
}
