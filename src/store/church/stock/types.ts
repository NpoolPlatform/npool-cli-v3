import { BaseRequest } from '../../base'

interface Stock {
  ID?: string
  GoodID: string
  Total: number
  InService?: number
  Locked?: number
  Sold?: number
}

interface CreateStockRequest extends BaseRequest {
  Info: Stock
}

interface CreateStockResponse {
  Info: Stock
}

interface UpdateStockRequest extends BaseRequest {
  Info: Stock
}

interface UpdateStockResponse {
  Info: Stock
}

interface GetStocksRequest extends BaseRequest {
}

interface GetStocksResponse {
  Infos: Array<Stock>
}

export {
  Stock,
  CreateStockRequest,
  CreateStockResponse,
  UpdateStockRequest,
  UpdateStockResponse,
  GetStocksRequest,
  GetStocksResponse
}
