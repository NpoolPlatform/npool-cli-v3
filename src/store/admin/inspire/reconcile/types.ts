import { BaseRequest } from '../../../base';

export interface ReconcileRequest extends BaseRequest {
  AppID?: string;
  UserID: string;
  GoodID: string;
}

export interface ReconcileResponse {
}