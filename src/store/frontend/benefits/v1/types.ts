import { BaseRequest } from '../../../base'

interface Archivement {
  UserID: string
  Username: string
  EmailAddress: string
  PhoneNO: string
  FirstName: string
  LastName: string
  Kol: boolean
  CoinTypeID: string
  CoinName: string
  CoinLogo: string
  CoinUnit: string
  TotalUnits: number
  SelfUnits: number
  TotalAmount: string
  SelfAmount: string
  TotalCommission: string
  SelfCommission: string
  CurPercent: number
}
interface GetArchivementRequest extends BaseRequest {
  Offset?: number
  Limit?: number
}

interface GetArchivementResponse {
  Archivements: Archivement[]
  Total: number
}

export {
  Archivement,
  GetArchivementRequest,
  GetArchivementResponse,
}
