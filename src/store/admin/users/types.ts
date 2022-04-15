import { UserInfo } from '../../frontend'
import { BaseRequest } from '../../base'

interface GetUsersRequest extends BaseRequest {
}

interface GetUsersResponse {
  Infos: Array<UserInfo>
}

export {
  GetUsersRequest,
  GetUsersResponse
}
