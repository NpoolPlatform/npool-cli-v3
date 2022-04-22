import {
  CreateCommissionSettingRequest,
  CreateCommissionSettingResponse,
  GetCommissionSettingRequest,
  GetCommissionSettingResponse
} from '../../admin'

interface CreateAppCommissionSettingRequest extends CreateCommissionSettingRequest {
  TargetAppID: string
}

interface CreateAppCommissionSettingResponse extends CreateCommissionSettingResponse {
}

interface GetAppCommissionSettingRequest extends GetCommissionSettingRequest {
  TargetAppID: string
}

interface GetAppCommissionSettingResponse extends GetCommissionSettingResponse {
}

export {
  CreateAppCommissionSettingRequest,
  CreateAppCommissionSettingResponse,
  GetAppCommissionSettingRequest,
  GetAppCommissionSettingResponse
}
