import { BaseRequest } from '../../base'

interface CoinGas {
  ID?: string
  CoinTypeID: string
  GasCoinTypeID: string
  DepositThresholdLow: number
  DepositAmount: number
}

interface Deposit {
  ID?: string
  AccountID: string
  DepositAmount: string
  CreatedAt: number
}

interface CreateCoinGasRequest extends BaseRequest {
  Info: CoinGas
}

interface CreateCoinGasResponse {
  Info: CoinGas
}

interface UpdateCoinGasRequest extends BaseRequest {
  Info: CoinGas
}

interface UpdateCoinGasResponse {
  Info: CoinGas
}

interface GetCoinGasesRequest extends BaseRequest {
}

interface GetCoinGasesResponse {
  Infos: Array<CoinGas>
}

interface GetDepositsRequest extends BaseRequest {
}

interface GetDepositsResponse {
  Infos: Array<Deposit>
}

interface GasFeederState {
  CoinGases: Array<CoinGas>
  Deposits: Array<Deposit>
}

export {
  CoinGas,
  CreateCoinGasRequest,
  CreateCoinGasResponse,
  UpdateCoinGasRequest,
  UpdateCoinGasResponse,
  GetCoinGasesRequest,
  GetCoinGasesResponse,
  Deposit,
  GetDepositsRequest,
  GetDepositsResponse,
  GasFeederState
}
