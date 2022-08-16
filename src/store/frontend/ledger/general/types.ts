import { BaseRequest } from 'src/store/base'

export interface General {
  CoinTypeID: string;
  CoinName: string;
  CoinLogo: string;
  CoinUnit: string;
  Incoming: string;
  Locked: string;
  Outcoming: string;
  Spendable: string;
}

export interface GetGeneralsRequest extends BaseRequest {
  Offset: number;
  Limit: number;
}

export interface GetGeneralsResponse {
  Infos: General[];
  Total: number;
}

export interface GetIntervalGeneralsRequest extends BaseRequest {
  StartAt: number;
  EndAt: number;
  Offset: number;
  Limit: number;
}

export interface GetIntervalGeneralsResponse {
  Infos: General[];
  Total: number;
}

export interface IntervalGeneral {
  Generals: Array<General>;
  Total: number;
}
