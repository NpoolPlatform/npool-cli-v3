import { ImageType, KYCImage, KYCInfo } from '../../frontend'

interface KYCsState {
  KYCs: Array<KYCInfo>
  Images: Map<string, Map<ImageType, KYCImage>>
}

export {
  KYCsState
}
