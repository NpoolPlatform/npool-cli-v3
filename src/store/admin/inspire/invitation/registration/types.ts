import { BaseRequest, Registration } from '../../../../base'

export interface GetRegistrationsRequest extends BaseRequest {
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetRegistrationsResponse {
  Infos: Registration[];
  /** @format int64 */
  Total: number;
}

export interface UpdateRegistrationRequest extends BaseRequest {
  ID: string;
  InviterID: string;
}

export interface UpdateRegistrationResponse {
  Info: Registration;
}
