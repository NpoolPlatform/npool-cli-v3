import { doAction, doActionWithError } from '../../../action'
import { defineStore } from 'pinia'
import { KYC, ImageType } from '../../../base/appuser'
import { API } from './const'
import {
  CreateKYCRequest,
  CreateKYCResponse,
  GetKYCImageRequest,
  GetKYCImageResponse,
  GetKYCRequest,
  GetKYCResponse,
  KYCImage,
  UpdateKYCRequest,
  UpdateKYCResponse,
  UploadKYCImageRequest,
  UploadKYCImageResponse
} from './types'

export const useFrontendKYCStore = defineStore('frontend-kyc-v4', {
  state: () => ({
    Images: new Map<ImageType, KYCImage>(),
    KYC: undefined as unknown as KYC
  }),
  getters: {},
  actions: {
    uploadImage (req: UploadKYCImageRequest, done: (error: boolean) => void) {
      doActionWithError<UploadKYCImageRequest, UploadKYCImageResponse>(
        API.UPLOAD_KYC_IMAGE,
        req,
        req.Message,
        (resp: UploadKYCImageResponse): void => {
          this.Images.set(req.ImageType, {
            Type: req.ImageType,
            URI: resp.Info,
            Base64: req.ImageBase64
          })
          done(false)
        }, () => {
          done(true)
        })
    },
    createKYC (req: CreateKYCRequest, done: (error: boolean) => void) {
      doActionWithError<CreateKYCRequest, CreateKYCResponse>(
        API.CREATE_KYC,
        req,
        req.Message,
        (resp: CreateKYCResponse): void => {
          this.KYC = resp.Info
          done(false)
        }, () => {
          done(true)
        })
    },
    updateKYC (req: UpdateKYCRequest, done?: (error: boolean) => void) {
      doActionWithError<UpdateKYCRequest, UpdateKYCResponse>(
        API.UPDATE_KYC,
        req,
        req.Message,
        (resp: UpdateKYCResponse): void => {
          this.KYC = resp.Info
          done?.(false)
        }, () => {
          done?.(true)
        })
    },
    getKYC (req: GetKYCRequest, done: (error: boolean) => void) {
      doActionWithError<GetKYCRequest, GetKYCResponse>(
        API.GET_KYC,
        req,
        req.Message,
        (resp: GetKYCResponse): void => {
          this.KYC = resp.Info
          done(false)
        }, () => {
          done(true)
        })
    },
    getKYCImage (req: GetKYCImageRequest, done: () => void) {
      doAction<GetKYCImageRequest, GetKYCImageResponse>(
        API.GET_KYC_IMAGE,
        req,
        req.Message,
        (resp: GetKYCImageResponse): void => {
          this.Images.set(req.ImageType, {
            Type: req.ImageType,
            URI: '',
            Base64: resp.Info
          })
          done()
        })
    }
  }
})

export * from './types'
