import { BaseRequest } from '../../../base'

export interface Fiat {
  /** @inject_tag: sql:"id" */
  ID: string;
  /** @inject_tag: sql:"name" */
  Name: string;
  /** @inject_tag: sql:"logo" */
  Logo: string;
  /** @inject_tag: sql:"unit" */
  Unit: string;
  /** @inject_tag: sql:"created_at" */
  CreatedAt: number;
  /** @inject_tag: sql:"updated_at" */
  UpdatedAt: number;
}
export interface CreateFiatRequest extends BaseRequest {
  Name: string;
  Unit: string;
  Logo: string;
}

export interface CreateFiatResponse {
  Info: Fiat;
}

export interface GetFiatsRequest extends BaseRequest {
  /** @format int32 */
  Offset: number;
  /** @format int32 */
  Limit: number;
}

export interface GetFiatsResponse {
  Infos: Fiat[];
  /** @format int64 */
  Total: number;
}

export interface UpdateFiatRequest extends BaseRequest {
  ID: string;
  Name: string;
  Unit: string;
  Logo: string;
}

export interface UpdateFiatResponse {
  Info: Fiat;
}
