import { BaseRequest } from '../../base'
import { AppControl, Application } from '../../frontend'

interface GetApplicationsRequest extends BaseRequest {
}

interface GetApplicationsResponse {
  Infos: Array<Application>
}

interface CreateAppControlRequest extends BaseRequest {
  TargetAppID: string
  Info: AppControl
}

interface CreateAppControlResponse {
  Info: AppControl
}

interface UpdateAppControlRequest extends BaseRequest {
  Info: AppControl
}

interface UpdateAppControlResponse {
  Info: AppControl
}

interface ApplicationsState {
  Applications: Array<Application>
}

export {
  GetApplicationsRequest,
  GetApplicationsResponse,
  CreateAppControlRequest,
  CreateAppControlResponse,
  UpdateAppControlRequest,
  UpdateAppControlResponse,
  ApplicationsState
}
