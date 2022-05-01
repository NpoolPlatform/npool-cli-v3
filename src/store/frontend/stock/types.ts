import { BaseRequest } from '../../base'

interface Stock {
  ID?: string
  GoodID: string
  Total: number
  InService?: number
  Locked?: number
  Sold?: number
}

interface GetStocksRequest extends BaseRequest {
}

interface GetStocksResponse {
  Infos: Array<Stock>
}

export {
  Stock,
  GetStocksRequest,
  GetStocksResponse
}
