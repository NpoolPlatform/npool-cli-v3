import { ReviewState } from '../../../const'
import { ReqMessage } from '../../local/notifications/types'
import { DocumentType, ImageType } from './const'

interface KYCImage {
  Type: ImageType
  URI: string
  Base64: string
}

interface UpdateKYCImageRequest {
  ImageType: ImageType
  ImageBase64: string
  Message: ReqMessage
}

interface UpdateKYCImageResponse {
  Info: string
}

interface KYCInfo {
  ID?: string
  CardType?: DocumentType
  CardID?: string
  FrontCardImg?: string
  BackCardImg?: string
  UserHandingCardImg?: string
  CreateAt?: number
}

interface KYC {
  Kyc?: KYCInfo
  State: ReviewState
  Message?: string
}

interface CreateKYCRequest {
  Info: KYCInfo
  Message: ReqMessage
}

interface CreateKYCResponse {
  Info: KYC
}

interface UpdateKYCRequest {
  Info: KYCInfo
  Message: ReqMessage
}

interface UpdateKYCResponse {
  Info: KYC
}

interface GetKYCRequest {
  Message: ReqMessage
}

interface GetKYCResponse {
  Info: KYC
}

interface GetKYCImageRequest {
  ImageType: ImageType
  ImageS3Key: string
  Message: ReqMessage
}

interface GetKYCImageResponse {
  Info: string
}

interface KYCState {
  Images: Map<ImageType, KYCImage>
  KYC: KYC
}

export {
  KYCInfo,
  KYCImage,
  UpdateKYCImageRequest,
  UpdateKYCImageResponse,
  KYC,
  CreateKYCRequest,
  CreateKYCResponse,
  UpdateKYCRequest,
  UpdateKYCResponse,
  GetKYCRequest,
  GetKYCResponse,
  GetKYCImageRequest,
  GetKYCImageResponse,
  KYCState
}
