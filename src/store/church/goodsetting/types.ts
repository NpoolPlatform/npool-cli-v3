import { BaseRequest } from '../../base'

interface GoodBenefit {
  ID?: string
  GoodID: string
  BenefitAccountID: string
  BenefitIntervalHours: number
}

interface GetGoodBenefitsRequest extends BaseRequest {
}

interface GetGoodBenefitsResponse {
  Infos: Array<GoodBenefit>
}

interface CreateGoodBenefitRequest extends BaseRequest {
  Info: GoodBenefit
}

interface CreateGoodBenefitResponse {
  Info: GoodBenefit
}

interface UpdateGoodBenefitRequest extends BaseRequest {
  Info: GoodBenefit
}

interface UpdateGoodBenefitResponse {
  Info: GoodBenefit
}

interface GoodSettingState {
  GoodBenefits: Array<GoodBenefit>
}

export {
  GoodBenefit,
  GetGoodBenefitsRequest,
  GetGoodBenefitsResponse,
  CreateGoodBenefitRequest,
  CreateGoodBenefitResponse,
  UpdateGoodBenefitRequest,
  UpdateGoodBenefitResponse,
  GoodSettingState
}
