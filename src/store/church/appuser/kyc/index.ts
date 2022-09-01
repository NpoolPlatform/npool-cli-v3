import { defineStore } from 'pinia'
import { API } from './const'
import { ImageType, KYCReview, } from '../../../base'
import {
  GetAppKycReviewsRequest,
  GetAppKycReviewsResponse,
  GetAppUserKYCImageRequest,
  GetAppUserKYCImageResponse,
  UpdateAppKycReviewRequest,
  UpdateAppKycReviewResponse
} from './types'
import { doActionWithError, doAction } from '../../../action'
import { KYCImage } from '../../../frontend/appuser' // error writing, need fix


export const useChurchKycStore = defineStore('church-kyc-v4', {
  state: () => ({
    KycReviews: {
      KycReviews: new Map<string,Array<KYCReview>>(),
      Total: 0
    },
    Images: new Map<string, Map<ImageType, KYCImage>>()
  }),
  getters: {
    targetAppReviews() : (targetAppID: string) => Array<KYCReview> {
      return (targetAppID: string) => {
        const data = this.KycReviews.KycReviews.get(targetAppID)
        return !data ? [] as Array<KYCReview> : data
      }
    }
  },
  actions: {
    getAppKycReviews (req: GetAppKycReviewsRequest, done: (reviews: Array<KYCReview>,error: boolean) => void) {
      doActionWithError<GetAppKycReviewsRequest, GetAppKycReviewsResponse>(
        API.GET_APP_KYCREVIEWS,
        req,
        req.Message,
        (resp: GetAppKycReviewsResponse): void => {
          const appReviews = this.targetAppReviews(req.TargetAppID)
          appReviews.push(...resp.Infos)
          this.KycReviews.KycReviews.set(req.TargetAppID, appReviews)
          this.KycReviews.Total = resp.Total
          done(resp.Infos, false)
        }, () => {
          done([], true)
        })
    },
    updateAppKycReview (req: UpdateAppKycReviewRequest, done: (kycReview: KYCReview, error: boolean) => void) {
      doActionWithError<UpdateAppKycReviewRequest, UpdateAppKycReviewResponse>(
        API.UPDATE_APP_KYCREVIEW,
        req,
        req.NotifyMessage,
        (resp: UpdateAppKycReviewResponse): void => {
          const appReviews = this.targetAppReviews(req.TargetAppID)
          const index = appReviews.findIndex((el) => el.KycID === resp.Info.KycID)
          appReviews.splice(index < 0 ? 0 : index, index < 0 ? 0 : 1, resp.Info)
          this.KycReviews.KycReviews.set(req.TargetAppID, appReviews)
          done(resp.Info, false)
        }, () => {
          done(undefined as unknown as KYCReview, true)
        })
    },
    getAppUserKYCImage (req: GetAppUserKYCImageRequest, kycID: string, done: () => void) {
      doAction<GetAppUserKYCImageRequest, GetAppUserKYCImageResponse>(
        API.GET_APP_KYCIMAGE,
        req,
        req.Message,
        (resp: GetAppUserKYCImageResponse): void => {
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
