import { KYC, ImageType, EntityType, DocumentType } from '../../../base/appuser'
import { BaseRequest } from '../../../base/notify'

export interface CreateKYCRequest extends BaseRequest {
  IDNumber: string;
  FrontImg: string;
  BackImg: string;
  SelfieImg: string;
  DocumentType: DocumentType;
  EntityType: EntityType;
}

export interface CreateKYCResponse {
  Info: KYC;
}

export type GetKYCRequest = BaseRequest

export interface GetKYCResponse {
  Info: KYC;
}

export interface GetKYCImageRequest extends BaseRequest{
  ImageType: ImageType;
}

export interface GetKYCImageResponse {
  Info: string;
}

export interface UpdateKYCRequest extends BaseRequest {
  KycID: string;
  IDNumber: string;
  FrontImg: string;
  BackImg: string;
  SelfieImg: string;
}

export interface UpdateKYCResponse {
  Info: KYC;
}

export interface UploadKYCImageRequest extends BaseRequest {
  ImageType: ImageType;
  ImageBase64: string;
}

export interface UploadKYCImageResponse {
  Info: string;
}

export interface KYCImage {
  Type: ImageType;
  URI: string;
  Base64: string;
}