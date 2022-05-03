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

interface GetTickerRequest extends BaseRequest {
  CoinNames: Array<string>
}

interface CoinTickerState {
  Tickers: Map<string, Ticker>
}

export {
  Ticker,
  GetTickerRequest,
  CoinTickerState
}
