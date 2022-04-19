import { BaseRequest } from '../../base'
import {
  VendorLocation
} from '../../frontend'

interface GetVendorLocationsRequest extends BaseRequest {
}

interface GetVendorLocationsResponse {
  Infos: Array<VendorLocation>
}

interface CreateVendorLocationRequest extends BaseRequest {
  Info: VendorLocation
}

interface CreateVendorLocationResponse {
  Info: VendorLocation
}

interface UpdateVendorLocationRequest extends BaseRequest {
  Info: VendorLocation
}

interface UpdateVendorLocationResponse {
  Info: VendorLocation
}

interface VendorLocationState {
  VendorLocations: Array<VendorLocation>
}

export {
  GetVendorLocationsRequest,
  GetVendorLocationsResponse,
  CreateVendorLocationRequest,
  CreateVendorLocationResponse,
  UpdateVendorLocationRequest,
  UpdateVendorLocationResponse,
  VendorLocationState
}