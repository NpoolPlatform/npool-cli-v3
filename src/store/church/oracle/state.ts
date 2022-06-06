import { CoinCurrency } from '../../admin'

interface OracleState {
  Currencies: Map<string, Array<CoinCurrency>>
}

export {
  OracleState
}
