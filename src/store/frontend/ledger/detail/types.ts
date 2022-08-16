import { BaseRequest } from 'src/store/base'

export interface Detail {
  CoinTypeID: string;
  CoinName: string;
  CoinLogo: string;
  CoinUnit: string;
  IOType: string;
  IOSubType: string;
  CreatedAt: number;
  Amount: string;
  IOExtra: string;
}

export interface GetDetailsRequest extends BaseRequest {
  StartAt?: number;
  EndAt?: number;
  Offset: number;
  Limit: number;
}

export interface GetDetailsResponse {
  Infos: Detail[];
  Total: number;
}