import { SpecialOffer } from '../../frontend'
import { BaseRequest } from '../../base'

interface UserSpecialOffer extends SpecialOffer {
  ReleaseByUserID: string
}

interface CreateSpecialOfferRequest extends BaseRequest {
  Info: UserSpecialOffer
}

interface CreateSpecialOfferResponse {
  Info: UserSpecialOffer
}

interface UpdateSpecialOfferRequest extends BaseRequest {
  Info: UserSpecialOffer
}

interface UpdateSpecialOfferResponse {
  Info: UserSpecialOffer
}

interface GetUserSpecialOffersRequest extends BaseRequest {
}

interface GetUserSpecialOffersResponse {
  Infos: Array<UserSpecialOffer>
}

export {
  UserSpecialOffer,
  CreateSpecialOfferRequest,
  CreateSpecialOfferResponse,
  UpdateSpecialOfferRequest,
  UpdateSpecialOfferResponse,
  GetUserSpecialOffersRequest,
  GetUserSpecialOffersResponse
}
