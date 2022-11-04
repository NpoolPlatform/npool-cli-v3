import { BaseRequest, GoodBenefitAccount } from '../../../base'
export interface CreateGoodBenefitAccountRequest extends BaseRequest {
  GoodID: string;
}

export interface CreateGoodBenefitAccountResponse {
  Info: GoodBenefitAccount;
}

export interface GetGoodBenefitAccountsRequest  extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetGoodBenefitAccountsResponse {
  Infos: GoodBenefitAccount[];
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
  Info: GoodBenefitAccount;
}