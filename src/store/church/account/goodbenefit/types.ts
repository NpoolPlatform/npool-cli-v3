import { BaseRequest, PlatformAccount } from '../../../base'
export interface CreateGoodBenefitAccountRequest extends BaseRequest {
  GoodID: string;
}

export interface CreateGoodBenefitAccountResponse {
  Info: PlatformAccount;
}

export interface GetGoodBenefitAccountsRequest  extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetGoodBenefitAccountsResponse {
  Infos: PlatformAccount[];
  Total: number;
}

export interface UpdateGoodBenefitAccountRequest  extends BaseRequest {
  ID: string;
  Backup: boolean;
  Active: boolean;
  Blocked: boolean;
  Locked: boolean;
}

export interface UpdateGoodBenefitAccountResponse {
  Info: PlatformAccount;
}