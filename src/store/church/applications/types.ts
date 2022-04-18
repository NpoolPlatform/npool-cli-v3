import { BaseRequest } from 'src/store/base'
import { Application } from '../../frontend'

interface GetApplicationsRequest extends BaseRequest {
}

interface GetApplicationsResponse {
  Infos: Array<Application>
}

interface ApplicationsState {
  Applications: Array<Application>
}

export {
  GetApplicationsRequest,
  GetApplicationsResponse,
  ApplicationsState
}
