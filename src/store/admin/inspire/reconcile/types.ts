import { BaseRequest } from '../../../base';

export interface ReconcileRequest extends BaseRequest {
  AppID?: string;
  TargetUserID: string;
  GoodID: string;
}

export interface ReconcileResponse {
}