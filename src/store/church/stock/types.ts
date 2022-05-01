import { Stock } from '../../frontend'
import { BaseRequest } from '../../base'

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

export {
  Stock,
  CreateStockRequest,
  CreateStockResponse,
  UpdateStockRequest,
  UpdateStockResponse
}
