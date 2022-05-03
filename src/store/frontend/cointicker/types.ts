import { BaseRequest } from '../../base'

interface Change {
  percent: number
  value: number
}

interface OHLC {
  o: number
  h: number
  l: number
  c: number
}

interface Ticker {
  iso: string,
  name: string,
  slug: string,
  change: Change,
  ohlc: OHLC,
  circulatingSupply: number,
  marketCap: number,
  ts: number,
  src: string
}

interface GetTickersRequest extends BaseRequest {
  CoinNames: Array<string>
}

interface GetTickersResponse {
  statusCode: number
  message: string
  data: Map<string, Ticker>
}

interface ETHGas {
  fast: number
  fastest: number
  safeLow: number
  average: number
}

interface GetETHGasRequest extends BaseRequest {
}

interface CoinTickerState {
  Tickers: Map<string, Ticker>
  ETHGas: ETHGas
}

export {
  Ticker,
  GetTickersRequest,
  GetTickersResponse,
  ETHGas,
  GetETHGasRequest,
  CoinTickerState
}
