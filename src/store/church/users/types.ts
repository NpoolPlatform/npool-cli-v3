import { GetUsersRequest, GetUsersResponse } from '../../admin'

interface GetAppUsersRequest extends GetUsersRequest {
  TargetAppID: string
}

interface GetAppUsersResponse extends GetUsersResponse {
}

export {
  GetAppUsersRequest,
  GetAppUsersResponse
}
