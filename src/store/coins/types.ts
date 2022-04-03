import { ReqMessage } from '../notifications/types'
import { State } from '../state'

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

interface CoinState extends State {
  Coins: Array<Coin>
}

export {
  Coin,
  CoinState,
  GetCoinsRequest,
  GetCoinsResponse
}
