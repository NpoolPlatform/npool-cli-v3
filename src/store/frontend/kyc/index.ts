import { defineStore } from 'pinia'
import { doAction, doActionWithError } from '../../action'
import { API, ImageType } from './const'
import {
  CreateKYCRequest,
  CreateKYCResponse,
  GetKYCImageRequest,
  GetKYCImageResponse,
  GetKYCRequest,
  GetKYCResponse,
  KYC,
  KYCImage,
  KYCState,
  UpdateKYCImageRequest,
  UpdateKYCImageResponse,
  UpdateKYCRequest,
  UpdateKYCResponse
} from './types'

export const useKYCStore = defineStore('kyc', {
  state: (): KYCState => ({
    Images: new Map<ImageType, KYCImage>(),
    KYC: undefined as unknown as KYC
  }),
  getters: {},
  actions: {
    uploadImage (req: UpdateKYCImageRequest, done: (error: boolean) => void) {
      doActionWithError<UpdateKYCImageRequest, UpdateKYCImageResponse>(
        API.UPLOAD_IMAGE,
        req,
        req.Message,
        (resp: UpdateKYCImageResponse): void => {
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
            URI: req.ImageS3Key,
            Base64: resp.Info
          })
          done()
        })
    }
  }
})

export { DocumentType, ImageType } from './const'
export * from './types'
