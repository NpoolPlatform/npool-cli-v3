import {
  CreateSpecialOfferRequest,
  CreateSpecialOfferResponse,
  GetUserSpecialOffersRequest,
  GetUserSpecialOffersResponse
} from '../../admin'

interface CreateAppSpecialOfferRequest extends CreateSpecialOfferRequest {
  TargetAppID: string
}

interface CreateAppSpecialOfferResponse extends CreateSpecialOfferResponse {
}

interface GetAppSpecialOffersRequest extends GetUserSpecialOffersRequest {
  TargetAppID: string
}

interface GetAppSpecialOffersResponse extends GetUserSpecialOffersResponse {
}

export {
  CreateAppSpecialOfferRequest,
  CreateAppSpecialOfferResponse,
  GetAppSpecialOffersRequest,
  GetAppSpecialOffersResponse
}
