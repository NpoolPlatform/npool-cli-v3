import { defineStore } from 'pinia'
import { API } from './const'
import { ImageType, KYCReview, } from '../../../base'
import {
  GetKycReviewsRequest,
  GetKycReviewsResponse,
  GetUserKYCImageRequest,
  GetUserKYCImageResponse,
  UpdateKycReviewRequest,
  UpdateKycReviewResponse
} from './types'
import { doActionWithError, doAction } from '../../../action'
import { KYCImage } from '../../../frontend/appuser' // error writing, need fix


export const useAdminKycStore = defineStore('admin-kyc-v4', {
  state: () => ({
    KycReviews: {
      KycReviews: [] as Array<KYCReview>,
      Total: 0
    },
    Images: new Map<string, Map<ImageType, KYCImage>>()
  }),
  getters: {},
  actions: {
    getKycReviews (req: GetKycReviewsRequest, done: (reviews: Array<KYCReview>,error: boolean) => void) {
      doActionWithError<GetKycReviewsRequest, GetKycReviewsResponse>(
        API.GET_KYCREVIEWS,
        req,
        req.Message,
        (resp: GetKycReviewsResponse): void => {
          this.KycReviews.KycReviews.push(...resp.Infos)
          this.KycReviews.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    updateKycReview (req: UpdateKycReviewRequest, done: (kycReview: KYCReview, error: boolean) => void) {
      doActionWithError<UpdateKycReviewRequest, UpdateKycReviewResponse>(
        API.UPDATE_KYCREVIEW,
        req,
        req.NotifyMessage,
        (resp: UpdateKycReviewResponse): void => {
          const index = this.KycReviews.KycReviews.findIndex((el) => el.KycID === resp.Info.KycID)
          this.KycReviews.KycReviews.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          done(resp.Info, false)
        }, () => {
          done(undefined as unknown as KYCReview, true)
        })
    },
    getUserKYCImage (req: GetUserKYCImageRequest, kycID: string, done: () => void) {
      doAction<GetUserKYCImageRequest, GetUserKYCImageResponse>(
        API.GET_USER_KYCIMAGE,
        req,
        req.Message,
        (resp: GetUserKYCImageResponse): void => {
          let myImgs = this.Images.get(kycID)
          if (!myImgs) {
            myImgs = new Map<ImageType, KYCImage>()
          }
          myImgs.set(req.ImageType, {
            Type: req.ImageType,
            URI: '',
            Base64: resp.Info
          })
          this.Images.set(kycID, myImgs)
          done()
        })
    }
  }
})
