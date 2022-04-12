import { ReqMessage } from '../../local/notifications/types'

interface Coin {
  ID?: string
  Name: string
  PreSale: boolean
  Unit: string
  Logo: string
  ReservedAmount: number
  ENV: string
  ForPay: boolean
  HomePage: string
  Specs: string
}

interface GetCoinsRequest {
  Message: ReqMessage
}

interface GetCoinsResponse {
  Infos: Array<Coin>
}

interface Description {
  ID: string
  CoinTypeID: string
  Title: string
  Message: string
  UsedFor: string
}

interface GetDescriptionRequest {
  CoinTypeID: string
  UsedFor: string
  Message: ReqMessage
}

interface GetDescriptionResponse {
  Info: Description
}

interface CoinState {
  Coins: Array<Coin>
  Descriptions: Map<string, Map<string, Description>>
  Currencies: Map<string, Map<string, number>>
}

export {
  Coin,
  CoinState,
  GetCoinsRequest,
  GetCoinsResponse,
  Description,
  GetDescriptionRequest,
  GetDescriptionResponse
}
