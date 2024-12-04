import { Injectable } from '@nestjs/common'
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary'

import { cloudinary } from 'src/config/cloudinary'

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File, folder: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      const options: { resource_type: 'image' | 'video' | 'raw' | 'auto'; folder: string; public_id?: string } = { resource_type: 'image', folder: folder }
      cloudinary.uploader
        .upload_stream(options, (error, result) => {
          if (error) reject(error)
          resolve(result)
        })
        .end(file.buffer)
    })
  }

  async deleteImage(publicId: string): Promise<UploadApiResponse | UploadApiErrorResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) reject(error)
        resolve(result)
      })
    })
  }

  getMediumImage(publicId: string): string {
    return cloudinary.url(publicId, { width: 400, height: 400, crop: 'fill' })
  }
}
