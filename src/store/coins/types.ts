import { ReqMessage } from '../notifications/types'

interface Coin {
  ID?: string
  Name: string
  PreSale: boolean
  Unit: string
  Logo: string
  ReservedAmount: number
  ENV: string
  ForPay: boolean
}

interface GetCoinsRequest {
  Message: ReqMessage
}

interface GetCoinsResponse {
  Infos: Array<Coin>
}

interface CoinState {
  Coins: Array<Coin>
}

export {
  Coin,
  CoinState,
  GetCoinsRequest,
  GetCoinsResponse
}
