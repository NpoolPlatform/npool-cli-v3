import { BaseRequest } from 'src/store/base'

interface Profit {
  CoinTypeID: string;
  CoinName: string;
  CoinLogo: string;
  CoinUnit: string;
  Incoming: string;
}

interface GetProfitsRequest extends BaseRequest {
  Offset?: number;
  Limit?: number;
  Key?: string;
}

interface GetProfitsResponse {
  Infos: Profit[];
  Total: number;
}


interface IntervalProfits {
  Profits: Array<Profit>;
  Total: number;
}

interface GetIntervalProfitsRequest extends BaseRequest {
  StartAt: number;
  EndAt: number;
  Offset?: number;
  Limit?: number;
}

interface GetIntervalProfitsResponse {
  Infos: Profit[];
  Total: number;
}


interface GoodProfit {
  GoodID: string;
  GoodName: string;
  GoodUnit: string;
  GoodServicePeriodDays: number;
  Units: number;
  CoinTypeID: string;
  CoinName: string;
  CoinLogo: string;
  CoinUnit: string;
  CoinPresale: boolean;
  Incoming: string;
}

interface GetGoodProfitsRequest extends BaseRequest {
  StartAt?: number;
  EndAt?: number;
  Offset?: number;
  Limit?: number;
  Key?: string;
}

interface GetGoodProfitsResponse {
  Infos: GoodProfit[];
  Total: number;
}


interface IntervalGoodProfits {
  Profits: Array<GoodProfit>;
  Total: number;
}

export {
  Profit,
  IntervalProfits,
  GetProfitsRequest,
  GetProfitsResponse,
  GetIntervalProfitsRequest,
  GetIntervalProfitsResponse,
  GoodProfit,
  IntervalGoodProfits,
  GetGoodProfitsRequest,
  GetGoodProfitsResponse
}
