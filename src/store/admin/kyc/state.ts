import { ImageType, KYCImage, KYCInfo } from '../../frontend'

interface ReviewState {
  KYCs: Array<KYCInfo>
  Images: Map<string, Map<ImageType, KYCImage>>
}

export {
  ReviewState
}
