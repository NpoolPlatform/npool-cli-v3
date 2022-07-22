import { BaseRequest } from '../../base'
import { GoodCommission, Referral } from '../../frontend'

interface GetUserReferralsRequest extends BaseRequest {
  TargetUserID: string
}

interface GetUserReferralsResponse {
  Infos: Array<Referral>
}

interface GetUserGoodCommissionsRequest extends BaseRequest {
  TargetUserID: string
}

interface GetUserGoodCommissionsResponse {
  Infos: Array<GoodCommission>
}

interface AdminInspireState {
  Referrals: Array<Referral>
  GoodCommissions: Array<GoodCommission>
}

export {
  Referral,
  GetUserReferralsRequest,
  GetUserReferralsResponse,
  GoodCommission,
  GetUserGoodCommissionsRequest,
  GetUserGoodCommissionsResponse,
  AdminInspireState
}
