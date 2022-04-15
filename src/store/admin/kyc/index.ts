import { defineStore } from 'pinia'
import { ReviewState } from './state'
import { doAction, doActionWithError } from '../../action'
import { API } from './const'
import { GetKYCsRequest, GetKYCsResponse } from './types'
import {
  ImageType,
  KYCImage,
  GetKYCImageRequest,
  GetKYCImageResponse
} from '../../frontend'
import { API as KYCAPI } from '../../frontend/kyc/const'

export const useReviewStore = defineStore('review', {
  state: (): ReviewState => ({
    KYCs: [],
    Images: new Map<string, Map<ImageType, KYCImage>>()
  }),
  getters: {
    getKYCImagesByID (): (kycID: string) => Map<ImageType, KYCImage> {
      return (kycID: string) => {
        return this.Images.get(kycID) as Map<ImageType, KYCImage>
      }
    }
  },
  actions: {
    getKYCs (req: GetKYCsRequest, done: (error: boolean) => void) {
      doActionWithError<GetKYCsRequest, GetKYCsResponse>(
        API.GET_KYCS,
        req,
        req.Message,
        (resp: GetKYCsResponse): void => {
          this.KYCs = resp.Infos
          done(false)
        }, () => {
          done(true)
        })
    },
    getKYCImage (req: GetKYCImageRequest, kycID: string, done: () => void) {
      doAction<GetKYCImageRequest, GetKYCImageResponse>(
        KYCAPI.GET_KYC_IMAGE,
        req,
        req.Message,
        (resp: GetKYCImageResponse): void => {
          let myImgs = this.Images.get(kycID)
          if (!myImgs) {
            myImgs = new Map<ImageType, KYCImage>()
          }
          myImgs.set(req.ImageType, {
            Type: req.ImageType,
            URI: req.ImageS3Key,
            Base64: resp.Info
          })
          done()
        })
    }
  }
})

export * from './types'
