import { BaseRequest } from '../../base'
import {
  DeviceInfo
} from '../../frontend'

interface GetDevicesRequest extends BaseRequest {
}

interface GetDevicesResponse {
  Infos: Array<DeviceInfo>
}

interface CreateDeviceRequest extends BaseRequest {
  Info: DeviceInfo
}

interface CreateDeviceResponse {
  Info: DeviceInfo
}

interface UpdateDeviceRequest extends BaseRequest {
  Info: DeviceInfo
}

interface UpdateDeviceResponse {
  Info: DeviceInfo
}

interface DeviceState {
  Devices: Array<DeviceInfo>
}

export {
  GetDevicesRequest,
  GetDevicesResponse,
  CreateDeviceRequest,
  CreateDeviceResponse,
  UpdateDeviceRequest,
  UpdateDeviceResponse,
  DeviceState
}