import { BaseRequest, DeviceInfo } from '../../../base'


export interface CreateDeviceInfoRequest extends BaseRequest {
  Type: string;
  Manufacturer: string;
  PowerComsuption: number;
  ShipmentAt: number;
  Posters: string[];
}

export interface CreateDeviceInfoResponse {
  Info: DeviceInfo;
}

export interface GetDeviceInfoRequest extends BaseRequest {
  ID: string;
}

export interface GetDeviceInfoResponse {
  Info: DeviceInfo;
}

export interface GetDeviceInfosRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetDeviceInfosResponse {
  Infos: DeviceInfo[];
  Total: number;
}

export interface UpdateDeviceInfoRequest extends BaseRequest {
  ID: string;
  Type: string;
  Manufacturer: string;
  PowerComsuption: number;
  ShipmentAt: number;
  Posters: string[];
}

export interface UpdateDeviceInfoResponse {
  Info: DeviceInfo;
}
