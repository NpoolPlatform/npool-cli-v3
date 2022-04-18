import { BaseRequest } from '../../base'
import { App, AppControl, Application } from '../../frontend'

interface CreateApplicationRequest extends BaseRequest {
  Info: App
}

interface CreateApplicationResponse {
  Info: App
}

interface UpdateApplicationRequest extends BaseRequest {
  Info: App
}

interface UpdateApplicationResponse {
  Info: App
}

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
  CreateApplicationRequest,
  CreateApplicationResponse,
  UpdateApplicationRequest,
  UpdateApplicationResponse,
  ApplicationsState
}
