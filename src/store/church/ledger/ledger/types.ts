import { Detail, BaseRequest } from '../../../base'

export interface CreateAppUserDepositRequest extends BaseRequest {
  CoinTypeID:   string;
  Amount:       string;
  TargetAppID:  string;
  TargetUserID: string;
}
export interface CreateAppUserDepositResponse {
  Info: Detail;
}